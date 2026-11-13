const express = require('express');
const db = require('../db');
const { SETTINGS } = db;
const requireAuth = require('../middleware/requireAuth');
const { upload, removeUploaded } = require('../middleware/upload');

const router = express.Router();

const all = async () => Object.fromEntries((await db.all('SELECT key, value FROM settings')).map(r => [r.key, r.value]));
const getValue = async key => (await db.get('SELECT value FROM settings WHERE key = ?', [key]))?.value;

// Public: everything the frontend needs (form links, picture URLs, copy).
router.get('/', async (req, res) => res.json(await all()));

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

const save = (q, key, value) => q.run(`INSERT INTO settings (key, value, updated_at)
  VALUES (?, ?, to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD HH24:MI:SS'))
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at`, [key, value]);

// Admin: update any number of links/texts at once: { form_apply: "...", about_body: "..." }
router.put('/', requireAuth, async (req, res) => {
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
  await db.transaction(async tx => { for (const [k, v] of updates) await save(tx, k, v); });
  res.json(await all());
});

// Admin: upload a picture (multipart field "image") for e.g. hero_image or events_banner_image.
router.put('/:key/image', requireAuth, upload.single('image'), async (req, res) => {
  const def = SETTINGS[req.params.key];
  if (!def || def.type !== 'image') {
    if (req.file) removeUploaded(req.file.url);
    return res.status(404).json({ error: 'Not a picture setting' });
  }
  if (!req.file) return res.status(400).json({ error: 'Attach an image in field "image"' });
  const old = await getValue(req.params.key);
  await save(db, req.params.key, req.file.url);
  removeUploaded(old);
  res.json(await all());
});

router.delete('/:key/image', requireAuth, async (req, res) => {
  const def = SETTINGS[req.params.key];
  if (!def || def.type !== 'image') return res.status(404).json({ error: 'Not a picture setting' });
  const old = await getValue(req.params.key);
  await save(db, req.params.key, '');
  removeUploaded(old);
  res.json(await all());
});

module.exports = router;
