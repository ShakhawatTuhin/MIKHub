const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, '..', 'mikhub.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','ongoing','past')),
    image_url TEXT,
    is_featured INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    duration_weeks INTEGER,
    image_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS carousel_slides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    position INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

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

const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
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
for (const key of Object.keys(SETTINGS)) insertSetting.run(key, defaults[key] || '');

module.exports = db;
module.exports.SETTINGS = SETTINGS;
