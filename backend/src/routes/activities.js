const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');
const { upload, removeUploaded } = require('../middleware/upload');

const router = express.Router();
const NOW = "to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD HH24:MI:SS')";
const STATUSES = ['upcoming', 'ongoing', 'past'];

// Public: ?status=upcoming|ongoing|past, ?featured=1 (hero carousel)
router.get('/', async (req, res) => {
  const where = [];
  const args = [];
  if (STATUSES.includes(req.query.status)) { where.push('status = ?'); args.push(req.query.status); }
  if (req.query.featured === '1') where.push('is_featured = 1');
  const sql = `SELECT * FROM activities ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
               ORDER BY date DESC NULLS LAST, id DESC`;
  res.json(await db.all(sql, args));
});

router.get('/:id', async (req, res) => {
  const row = await getById(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// Non-numeric ids can never match a row (and would make Postgres throw), so treat them as missing.
const getById = id => /^\d+$/.test(String(id)) ? db.get('SELECT * FROM activities WHERE id = ?', [id]) : undefined;

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
  return async (req, res) => {
    const existing = partial ? await getById(req.params.id) : null;
    if (partial && !existing) {
      if (req.file) removeUploaded(req.file.url);
      return res.status(404).json({ error: 'Not found' });
    }
    const { out, errors } = parse(req.body || {}, partial);
    if (errors.length) {
      if (req.file) removeUploaded(req.file.url);
      return res.status(400).json({ errors });
    }
    if (req.file) out.image_url = req.file.url;
    else if (req.body.remove_image === 'true' || req.body.image_url === '') out.image_url = null;
    else if (typeof req.body.image_url === 'string' && /^https?:\/\//.test(req.body.image_url)) out.image_url = req.body.image_url;

    if (!partial) {
      out.status = out.status || 'upcoming';
      const v = { date: null, image_url: null, is_featured: 0, ...out };
      const row = await db.get(`INSERT INTO activities (title, description, date, status, image_url, is_featured)
        VALUES (?,?,?,?,?,?) RETURNING *`,
        [v.title, v.description, v.date, v.status, v.image_url, v.is_featured]);
      return res.status(201).json(row);
    }
    const keys = Object.keys(out);
    if (keys.length) {
      await db.run(`UPDATE activities SET ${keys.map(k => `${k} = ?`).join(', ')}, updated_at = ${NOW} WHERE id = ?`,
        [...keys.map(k => out[k]), existing.id]);
      if ('image_url' in out && existing.image_url !== out.image_url) removeUploaded(existing.image_url);
    }
    res.json(await getById(existing.id));
  };
}

router.post('/', requireAuth, upload.single('image'), write(false));
router.put('/:id', requireAuth, upload.single('image'), write(true));
router.patch('/:id', requireAuth, upload.single('image'), write(true));

router.delete('/:id', requireAuth, async (req, res) => {
  const row = await getById(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  await db.run('DELETE FROM activities WHERE id = ?', [row.id]);
  removeUploaded(row.image_url);
  res.status(204).end();
});

module.exports = router;
