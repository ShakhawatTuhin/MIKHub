// Optional starter content mirroring the placeholders currently hardcoded in the frontend.
const db = require('./db');

(async () => {
  await db.ready;
  if ((await db.get('SELECT COUNT(*) AS c FROM activities')).c === 0) {
    const sql = 'INSERT INTO activities (title, description, date, status, is_featured) VALUES (?,?,?,?,?)';
    await db.run(sql, ['Hackathon 2026', 'Build projects with students across Europe.', '2026-08-12', 'upcoming', 1]);
    await db.run(sql, ['Startup Challenge', 'Pitch ideas and compete for prizes.', '2026-09-04', 'upcoming', 1]);
    await db.run(sql, ['AI Build Weekend', 'Students teamed up to ship AI-powered mini apps in 48 hours.', '2026-06-14', 'past', 0]);
  }
  if ((await db.get('SELECT COUNT(*) AS c FROM faqs')).c === 0) {
    const sql = 'INSERT INTO faqs (question, answer, position) VALUES (?,?,?)';
    await db.run(sql, ['Who can join MIK-HUB?', 'Any student enrolled at the University of Pécs (MIK faculty) can join — regardless of year or program.', 1]);
    await db.run(sql, ['How do I apply?', 'Fill out the application form in the Apply section. We review applications on a rolling basis.', 2]);
  }
  console.log('Seeded.');
  await db.pool.end();
})().catch(e => { console.error(e); process.exit(1); });
