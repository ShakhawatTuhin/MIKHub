const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');
const { uploadMany, removeUploaded } = require('../middleware/upload');

const router = express.Router();
const get = (id, q = db) => /^\d+$/.test(String(id)) ? q.get('SELECT * FROM carousel_slides WHERE id = ?', [id]) : undefined;

// Public: slides in display order
router.get('/', async (req, res) => {
  res.json(await db.all('SELECT * FROM carousel_slides ORDER BY position, id'));
});

// Admin: upload one or several images at once (multipart field "images"); optional shared title/description.
router.post('/', requireAuth, uploadMany.array('images', 10), async (req, res) => {
  if (!req.files || !req.files.length) return res.status(400).json({ error: 'Attach one or more images in field "images"' });
  const b = req.body || {};
  const created = await db.transaction(async tx => {
    const next = (await tx.get('SELECT COALESCE(MAX(position),0) AS p FROM carousel_slides')).p;
    const rows = [];
    for (const [i, f] of req.files.entries()) {
      rows.push(await tx.get(
        'INSERT INTO carousel_slides (image_url, title, description, position) VALUES (?,?,?,?) RETURNING *',
        [f.url, String(b.title || '').trim(), String(b.description || '').trim(), next + 1 + i]));
    }
    return rows;
  });
  res.status(201).json(created);
});

// Admin: edit caption text, position, or replace the image
router.put('/:id', requireAuth, uploadMany.single('image'), async (req, res) => {
  const row = await get(req.params.id);
  if (!row) {
    if (req.file) removeUploaded(req.file.url);
    return res.status(404).json({ error: 'Not found' });
  }
  const b = req.body || {};
  const title = typeof b.title === 'string' ? b.title.trim() : row.title;
  const description = typeof b.description === 'string' ? b.description.trim() : row.description;
  const position = Number.isInteger(Number(b.position)) && b.position !== undefined && b.position !== '' ? Number(b.position) : row.position;
  const image_url = req.file ? req.file.url : row.image_url;
  await db.run('UPDATE carousel_slides SET title=?, description=?, position=?, image_url=? WHERE id=?',
    [title, description, position, image_url, row.id]);
  if (req.file) removeUploaded(row.image_url);
  res.json(await get(row.id));
});

// Admin: reorder — body { order: [id, id, ...] }
router.put('/', requireAuth, async (req, res) => {
  const order = req.body && req.body.order;
  if (!Array.isArray(order) || !order.every(Number.isInteger)) return res.status(400).json({ error: 'order must be an array of ids' });
  await db.transaction(async tx => {
    for (const [i, id] of order.entries()) await tx.run('UPDATE carousel_slides SET position = ? WHERE id = ?', [i + 1, id]);
  });
  res.json(await db.all('SELECT * FROM carousel_slides ORDER BY position, id'));
});

router.delete('/:id', requireAuth, async (req, res) => {
  const row = await get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  await db.run('DELETE FROM carousel_slides WHERE id = ?', [row.id]);
  removeUploaded(row.image_url);
  res.status(204).end();
});

module.exports = router;
