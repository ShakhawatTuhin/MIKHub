const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');
const { upload, removeUploaded } = require('../middleware/upload');

const router = express.Router();
const STATUSES = ['upcoming', 'ongoing', 'past'];

// Public: ?status=upcoming|ongoing|past, ?featured=1 (hero carousel)
router.get('/', (req, res) => {
  const where = [];
  const args = [];
  if (STATUSES.includes(req.query.status)) { where.push('status = ?'); args.push(req.query.status); }
  if (req.query.featured === '1') where.push('is_featured = 1');
  const sql = `SELECT * FROM activities ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
               ORDER BY date IS NULL, date DESC, id DESC`;
  res.json(db.prepare(sql).all(...args));
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM activities WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

function parse(body, partial) {
  const out = {};
  const errors = [];
  for (const f of ['title', 'description']) {
    if (body[f] !== undefined) {
      if (typeof body[f] !== 'string' || !body[f].trim()) errors.push(`${f} must be non-empty`);
      else out[f] = body[f].trim();
    } else if (!partial) errors.push(`${f} is required`);
  }
  if (body.date !== undefined) {
    if (body.date === '' || body.date === null) out.date = null;
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date) || isNaN(Date.parse(body.date))) errors.push('date must be YYYY-MM-DD');
    else out.date = body.date;
  }
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) errors.push(`status must be one of ${STATUSES.join(', ')}`);
    else out.status = body.status;
  }
  if (body.is_featured !== undefined) out.is_featured = ['1', 'true', 1, true, 'on'].includes(body.is_featured) ? 1 : 0;
  return { out, errors };
}

// Image may be sent as multipart field "image", or an existing URL via image_url in the body.
function write(partial) {
  return (req, res) => {
    const existing = partial ? db.prepare('SELECT * FROM activities WHERE id = ?').get(req.params.id) : null;
    if (partial && !existing) {
      if (req.file) removeUploaded('/uploads/' + req.file.filename);
      return res.status(404).json({ error: 'Not found' });
    }
    const { out, errors } = parse(req.body || {}, partial);
    if (errors.length) {
      if (req.file) removeUploaded('/uploads/' + req.file.filename);
      return res.status(400).json({ errors });
    }
    if (req.file) out.image_url = '/uploads/' + req.file.filename;
    else if (req.body.remove_image === 'true' || req.body.image_url === '') out.image_url = null;
    else if (typeof req.body.image_url === 'string' && /^https?:\/\//.test(req.body.image_url)) out.image_url = req.body.image_url;

    if (!partial) {
      out.status = out.status || 'upcoming';
      const info = db.prepare(`INSERT INTO activities (title, description, date, status, image_url, is_featured)
        VALUES (@title, @description, @date, @status, @image_url, @is_featured)`)
        .run({ date: null, image_url: null, is_featured: 0, ...out });
      return res.status(201).json(db.prepare('SELECT * FROM activities WHERE id = ?').get(info.lastInsertRowid));
    }
    const keys = Object.keys(out);
    if (keys.length) {
      db.prepare(`UPDATE activities SET ${keys.map(k => `${k} = @${k}`).join(', ')}, updated_at = datetime('now') WHERE id = @id`)
        .run({ ...out, id: existing.id });
      if ('image_url' in out && existing.image_url !== out.image_url) removeUploaded(existing.image_url);
    }
    res.json(db.prepare('SELECT * FROM activities WHERE id = ?').get(existing.id));
  };
}

router.post('/', requireAuth, upload.single('image'), write(false));
router.put('/:id', requireAuth, upload.single('image'), write(true));
router.patch('/:id', requireAuth, upload.single('image'), write(true));

router.delete('/:id', requireAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM activities WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  db.prepare('DELETE FROM activities WHERE id = ?').run(row.id);
  removeUploaded(row.image_url);
  res.status(204).end();
});

module.exports = router;
