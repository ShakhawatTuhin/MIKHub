// Optional starter content mirroring the placeholders currently hardcoded in the frontend.
const db = require('./db');

if (db.prepare('SELECT COUNT(*) c FROM activities').get().c === 0) {
  const a = db.prepare('INSERT INTO activities (title, description, date, status, is_featured) VALUES (?,?,?,?,?)');
  a.run('Hackathon 2026', 'Build projects with students across Europe.', '2026-08-12', 'upcoming', 1);
  a.run('Startup Challenge', 'Pitch ideas and compete for prizes.', '2026-09-04', 'upcoming', 1);
  a.run('AI Build Weekend', 'Students teamed up to ship AI-powered mini apps in 48 hours.', '2026-06-14', 'past', 0);
}
if (db.prepare('SELECT COUNT(*) c FROM faqs').get().c === 0) {
  const f = db.prepare('INSERT INTO faqs (question, answer, position) VALUES (?,?,?)');
  f.run('Who can join MIK-HUB?', 'Any student enrolled at the University of Pécs (MIK faculty) can join — regardless of year or program.', 1);
  f.run('How do I apply?', 'Fill out the application form in the Apply section. We review applications on a rolling basis.', 2);
}
console.log('Seeded.');
