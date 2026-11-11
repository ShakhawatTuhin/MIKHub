const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');
const { uploadMany, removeUploaded } = require('../middleware/upload');

const router = express.Router();
const get = id => db.prepare('SELECT * FROM carousel_slides WHERE id = ?').get(id);

// Public: slides in display order
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM carousel_slides ORDER BY position, id').all());
});

// Admin: upload one or several images at once (multipart field "images"); optional shared title/description.
router.post('/', requireAuth, uploadMany.array('images', 10), (req, res) => {
  if (!req.files || !req.files.length) return res.status(400).json({ error: 'Attach one or more images in field "images"' });
  const b = req.body || {};
  const next = db.prepare('SELECT COALESCE(MAX(position),0) AS p FROM carousel_slides').get().p;
  const ins = db.prepare('INSERT INTO carousel_slides (image_url, title, description, position) VALUES (?,?,?,?)');
  const created = db.transaction(() => req.files.map((f, i) =>
    get(ins.run('/uploads/' + f.filename, String(b.title || '').trim(), String(b.description || '').trim(), next + 1 + i).lastInsertRowid)))();
  res.status(201).json(created);
});

// Admin: edit caption text, position, or replace the image
router.put('/:id', requireAuth, uploadMany.single('image'), (req, res) => {
  const row = get(req.params.id);
  if (!row) {
    if (req.file) removeUploaded('/uploads/' + req.file.filename);
    return res.status(404).json({ error: 'Not found' });
  }
  const b = req.body || {};
  const title = typeof b.title === 'string' ? b.title.trim() : row.title;
  const description = typeof b.description === 'string' ? b.description.trim() : row.description;
  const position = Number.isInteger(Number(b.position)) && b.position !== undefined && b.position !== '' ? Number(b.position) : row.position;
  const image_url = req.file ? '/uploads/' + req.file.filename : row.image_url;
  db.prepare('UPDATE carousel_slides SET title=?, description=?, position=?, image_url=? WHERE id=?')
    .run(title, description, position, image_url, row.id);
  if (req.file) removeUploaded(row.image_url);
  res.json(get(row.id));
});

// Admin: reorder — body { order: [id, id, ...] }
router.put('/', requireAuth, (req, res) => {
  const order = req.body && req.body.order;
  if (!Array.isArray(order) || !order.every(Number.isInteger)) return res.status(400).json({ error: 'order must be an array of ids' });
  const up = db.prepare('UPDATE carousel_slides SET position = ? WHERE id = ?');
  db.transaction(() => order.forEach((id, i) => up.run(i + 1, id)))();
  res.json(db.prepare('SELECT * FROM carousel_slides ORDER BY position, id').all());
});

router.delete('/:id', requireAuth, (req, res) => {
  const row = get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  db.prepare('DELETE FROM carousel_slides WHERE id = ?').run(row.id);
  removeUploaded(row.image_url);
  res.status(204).end();
});

module.exports = router;
