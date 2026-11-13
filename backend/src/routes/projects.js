const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');
const { upload, removeUploaded } = require('../middleware/upload');

const router = express.Router();
const NOW = "to_char(now() AT TIME ZONE 'utc', 'YYYY-MM-DD HH24:MI:SS')";
const getById = id => /^\d+$/.test(String(id)) ? db.get('SELECT * FROM projects WHERE id = ?', [id]) : undefined;
const hydrate = r => r && { ...r, tags: JSON.parse(r.tags) };

router.get('/', async (req, res) => {
  res.json((await db.all('SELECT * FROM projects ORDER BY id DESC')).map(hydrate));
});

router.get('/:id', async (req, res) => {
  const row = await getById(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(hydrate(row));
});

function parse(body, partial) {
  const out = {}, errors = [];
  for (const f of ['title', 'description']) {
    if (body[f] !== undefined) {
      if (typeof body[f] !== 'string' || !body[f].trim()) errors.push(`${f} must be non-empty`);
      else out[f] = body[f].trim();
    } else if (!partial) errors.push(`${f} is required`);
  }
  if (body.tags !== undefined) {
    let tags = body.tags;
    if (typeof tags === 'string') { try { tags = JSON.parse(tags); } catch { tags = tags.split(','); } }
    if (!Array.isArray(tags)) errors.push('tags must be an array');
    else out.tags = JSON.stringify(tags.map(t => String(t).trim()).filter(Boolean));
  }
  if (body.duration_weeks !== undefined) {
    if (body.duration_weeks === '' || body.duration_weeks === null) out.duration_weeks = null;
    else if (!Number.isInteger(Number(body.duration_weeks)) || Number(body.duration_weeks) < 0) errors.push('duration_weeks must be a non-negative integer');
    else out.duration_weeks = Number(body.duration_weeks);
  }
  return { out, errors };
}

function write(partial) {
  return async (req, res) => {
    const existing = partial ? await getById(req.params.id) : null;
    const cleanup = () => req.file && removeUploaded(req.file.url);
    if (partial && !existing) { cleanup(); return res.status(404).json({ error: 'Not found' }); }
    const { out, errors } = parse(req.body || {}, partial);
    if (errors.length) { cleanup(); return res.status(400).json({ errors }); }
    if (req.file) out.image_url = req.file.url;
    else if (req.body.remove_image === 'true' || req.body.image_url === '') out.image_url = null;
    else if (typeof req.body.image_url === 'string' && /^https?:\/\//.test(req.body.image_url)) out.image_url = req.body.image_url;

    if (!partial) {
      const v = { tags: '[]', duration_weeks: null, image_url: null, ...out };
      const row = await db.get(`INSERT INTO projects (title, description, tags, duration_weeks, image_url)
        VALUES (?,?,?,?,?) RETURNING *`,
        [v.title, v.description, v.tags, v.duration_weeks, v.image_url]);
      return res.status(201).json(hydrate(row));
    }
    const keys = Object.keys(out);
    if (keys.length) {
      await db.run(`UPDATE projects SET ${keys.map(k => `${k} = ?`).join(', ')}, updated_at = ${NOW} WHERE id = ?`,
        [...keys.map(k => out[k]), existing.id]);
      if ('image_url' in out && existing.image_url !== out.image_url) removeUploaded(existing.image_url);
    }
    res.json(hydrate(await getById(existing.id)));
  };
}

router.post('/', requireAuth, upload.single('image'), write(false));
router.put('/:id', requireAuth, upload.single('image'), write(true));
router.patch('/:id', requireAuth, upload.single('image'), write(true));

router.delete('/:id', requireAuth, async (req, res) => {
  const row = await getById(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  await db.run('DELETE FROM projects WHERE id = ?', [row.id]);
  removeUploaded(row.image_url);
  res.status(204).end();
});

module.exports = router;
