const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

const getById = id => /^\d+$/.test(String(id)) ? db.get('SELECT * FROM faqs WHERE id = ?', [id]) : undefined;

router.get('/', async (req, res) => {
  res.json(await db.all('SELECT * FROM faqs ORDER BY position, id'));
});

const valid = (b, partial) => ['question', 'answer'].every(f =>
  b[f] === undefined ? partial : typeof b[f] === 'string' && b[f].trim());

router.post('/', requireAuth, async (req, res) => {
  const b = req.body || {};
  if (!valid(b, false)) return res.status(400).json({ error: 'question and answer are required' });
  const pos = Number.isInteger(b.position) ? b.position : (await db.get('SELECT COALESCE(MAX(position),0)+1 AS p FROM faqs')).p;
  const row = await db.get('INSERT INTO faqs (question, answer, position) VALUES (?,?,?) RETURNING *', [b.question.trim(), b.answer.trim(), pos]);
  res.status(201).json(row);
});

router.put('/:id', requireAuth, async (req, res) => {
  const row = await getById(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  const b = req.body || {};
  if (!valid(b, true)) return res.status(400).json({ error: 'question and answer must be non-empty strings' });
  await db.run('UPDATE faqs SET question=?, answer=?, position=? WHERE id=?', [
    b.question?.trim() ?? row.question, b.answer?.trim() ?? row.answer,
    Number.isInteger(b.position) ? b.position : row.position, row.id]);
  res.json(await getById(row.id));
});

router.delete('/:id', requireAuth, async (req, res) => {
  const r = /^\d+$/.test(req.params.id) ? await db.run('DELETE FROM faqs WHERE id = ?', [req.params.id]) : { rowCount: 0 };
  if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

module.exports = router;
