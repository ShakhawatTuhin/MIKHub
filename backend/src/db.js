require('dotenv').config();
const { Pool, types } = require('pg');

// Return DATE columns as plain 'YYYY-MM-DD' strings (not JS Date objects) and BIGINT/COUNT as numbers.
types.setTypeParser(1082, v => v);
types.setTypeParser(20, v => parseInt(v, 10));

if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL in .env (see .env.example)');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Most hosted Postgres providers (Render, Railway, Neon, Supabase, Heroku) require SSL: set PGSSL=true.
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

// Accepts SQLite-style "?" placeholders and converts them to $1, $2, ...
const toPg = sql => { let i = 0; return sql.replace(/\?/g, () => `$${++i}`); };

const makeRunner = client => ({
  /** All rows. */
  all: async (sql, params = []) => (await client.query(toPg(sql), params)).rows,
  /** First row or undefined. */
  get: async (sql, params = []) => (await client.query(toPg(sql), params)).rows[0],
  /** Execute; returns { rowCount, rows }. */
  run: (sql, params = []) => client.query(toPg(sql), params),
});

const db = makeRunner(pool);

/** Run fn(tx) inside a transaction; tx has the same all/get/run helpers. */
db.transaction = async fn => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(makeRunner(client));
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    client.release();
  }
};

const NOW = "to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD HH24:MI:SS')";

const schema = `
  CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','ongoing','past')),
    image_url TEXT,
    is_featured INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (${NOW}),
    updated_at TEXT NOT NULL DEFAULT (${NOW})
  );

  CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    duration_weeks INTEGER,
    image_url TEXT,
    created_at TEXT NOT NULL DEFAULT (${NOW}),
    updated_at TEXT NOT NULL DEFAULT (${NOW})
  );

  CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS carousel_slides (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    position INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (${NOW})
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT (${NOW})
  );
`;

// Editable site-wide content. type: url = Google Form / link, image = uploaded picture, text = copy.
const SETTINGS = {
  form_apply:             { type: 'url',   label: 'Apply Now Google Form' },
  form_propose_activity:  { type: 'url',   label: 'Propose an activity Google Form' },
  form_propose_project:   { type: 'url',   label: 'Propose a project Google Form' },
  hero_image:             { type: 'image', label: 'Front page (hero) picture' },
  events_banner_image:    { type: 'image', label: 'Events page banner picture' },
  intro_text:             { type: 'text',  label: 'Front page intro line' },
  apply_heading:          { type: 'text',  label: 'Apply section heading' },
  apply_text:             { type: 'text',  label: 'Apply section description' },
  activities_title:       { type: 'text',  label: 'Events page title' },
  activities_subtitle:    { type: 'text',  label: 'Events page description' },
  about_heading:          { type: 'text',  label: 'About heading' },
  about_body:             { type: 'text',  label: 'About description' },
  about_mission:          { type: 'text',  label: 'Mission description' },
  about_vision:           { type: 'text',  label: 'Vision description' },
  contact_email:          { type: 'text',  label: 'Contact email' },
};

const defaults = {
  intro_text: 'Where students build, learn and launch their careers.',
  apply_heading: 'Ready to build with us?',
  apply_text: 'Applications are open. Tell us what excites you and join the next cohort of MIK-HUB builders.',
  activities_title: "What we're up to",
  activities_subtitle: 'Workshops, build weekends and meetups happening across the club right now.',
  about_heading: 'A community where ideas become careers.',
  about_body: 'We bring together curious students, hands-on projects, and mentors who care — so that learning never stays theoretical.',
  about_mission: 'To empower students with real-world skills through hands-on projects and a collaborative community.',
  about_vision: 'To be the launchpad where every student turns curiosity into a thriving career.',
  contact_email: 'mikhub.pte@gmail.com',
};


/** Create tables and default settings. Resolves once the database is ready. */
db.ready = (async () => {
  await pool.query(schema);
  for (const key of Object.keys(SETTINGS)) {
    await pool.query('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING', [key, defaults[key] || '']);
  }
})();

db.pool = pool;
db.SETTINGS = SETTINGS;
module.exports = db;
