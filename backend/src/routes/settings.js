const express = require('express');
const db = require('../db');
const { SETTINGS } = db;
const requireAuth = require('../middleware/requireAuth');
const { upload, removeUploaded } = require('../middleware/upload');

const router = express.Router();

const all = () => Object.fromEntries(db.prepare('SELECT key, value FROM settings').all().map(r => [r.key, r.value]));

// Public: everything the frontend needs (form links, picture URLs, copy).
router.get('/', (req, res) => res.json(all()));

// Admin: describes each editable field (for building the admin form).
router.get('/schema', requireAuth, (req, res) => res.json(SETTINGS));

/** Google Forms links only (docs.google.com/forms, forms.gle, forms.google.com). Empty clears the link. */
function validForm(v) {
  if (v === '') return true;
  try {
    const u = new URL(v);
    if (u.protocol !== 'https:') return false;
    return u.hostname === 'forms.gle' || u.hostname === 'forms.google.com' ||
      (u.hostname === 'docs.google.com' && u.pathname.startsWith('/forms/'));
  } catch { return false; }
}

const save = db.prepare(`INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
  ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`);

// Admin: update any number of links/texts at once: { form_apply: "...", about_body: "..." }
router.put('/', requireAuth, (req, res) => {
  const body = req.body || {};
  const errors = [];
  const updates = [];
  for (const [key, value] of Object.entries(body)) {
    const def = SETTINGS[key];
    if (!def) { errors.push(`Unknown setting: ${key}`); continue; }
    if (def.type === 'image') { errors.push(`${key} is a picture; use PUT /api/settings/${key}/image`); continue; }
    if (typeof value !== 'string' || value.length > 5000) { errors.push(`${key} must be a string`); continue; }
    if (def.type === 'url' && !validForm(value.trim())) { errors.push(`${key} must be a Google Forms https link`); continue; }
    updates.push([key, value.trim()]);
  }
  if (errors.length) return res.status(400).json({ errors });
  db.transaction(() => updates.forEach(([k, v]) => save.run(k, v)))();
  res.json(all());
});

// Admin: upload a picture (multipart field "image") for e.g. hero_image or events_banner_image.
router.put('/:key/image', requireAuth, upload.single('image'), (req, res) => {
  const def = SETTINGS[req.params.key];
  if (!def || def.type !== 'image') {
    if (req.file) removeUploaded('/uploads/' + req.file.filename);
    return res.status(404).json({ error: 'Not a picture setting' });
  }
  if (!req.file) return res.status(400).json({ error: 'Attach an image in field "image"' });
  const old = db.prepare('SELECT value FROM settings WHERE key = ?').get(req.params.key)?.value;
  save.run(req.params.key, '/uploads/' + req.file.filename);
  removeUploaded(old);
  res.json(all());
});

router.delete('/:key/image', requireAuth, (req, res) => {
  const def = SETTINGS[req.params.key];
  if (!def || def.type !== 'image') return res.status(404).json({ error: 'Not a picture setting' });
  const old = db.prepare('SELECT value FROM settings WHERE key = ?').get(req.params.key)?.value;
  save.run(req.params.key, '');
  removeUploaded(old);
  res.json(all());
});

module.exports = router;
