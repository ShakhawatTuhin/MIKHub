// One-off: copy data from an old SQLite file into PostgreSQL.
//   npm i --no-save better-sqlite3 && node src/migrate_from_sqlite.js [path/to/mikhub.db]
// Safe to re-run: existing rows (same id) are left untouched.
const path = require('path');
const Database = require('better-sqlite3');
const db = require('./db');

const file = process.argv[2] || path.join(__dirname, '..', 'mikhub.db');
const TABLES = {
  activities: ['id', 'title', 'description', 'date', 'status', 'image_url', 'is_featured', 'created_at', 'updated_at'],
  projects: ['id', 'title', 'description', 'tags', 'duration_weeks', 'image_url', 'created_at', 'updated_at'],
  faqs: ['id', 'question', 'answer', 'position'],
  carousel_slides: ['id', 'image_url', 'title', 'description', 'position', 'created_at'],
};

(async () => {
  await db.ready;
  const src = new Database(file, { readonly: true });
  for (const [table, cols] of Object.entries(TABLES)) {
    const rows = src.prepare(`SELECT ${cols.join(', ')} FROM ${table}`).all();
    for (const r of rows) {
      await db.run(`INSERT INTO ${table} (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')}) ON CONFLICT (id) DO NOTHING`, cols.map(c => r[c]));
    }
    // keep the SERIAL sequence ahead of the copied ids
    await db.run(`SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE((SELECT MAX(id) FROM ${table}), 0) + 1, false)`);
    console.log(`${table}: ${rows.length} rows`);
  }
  for (const r of src.prepare('SELECT key, value, updated_at FROM settings').all()) {
    await db.run('INSERT INTO settings (key, value, updated_at) VALUES (?,?,?) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at', [r.key, r.value, r.updated_at]);
  }
  console.log('settings copied');
  await db.pool.end();
})().catch(e => { console.error(e); process.exit(1); });
