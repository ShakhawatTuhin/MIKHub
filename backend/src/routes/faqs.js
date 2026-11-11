const express = require('express');
const db = require('../db');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM faqs ORDER BY position, id').all());
});

const valid = (b, partial) => ['question', 'answer'].every(f =>
  b[f] === undefined ? partial : typeof b[f] === 'string' && b[f].trim());

router.post('/', requireAuth, (req, res) => {
  const b = req.body || {};
  if (!valid(b, false)) return res.status(400).json({ error: 'question and answer are required' });
  const pos = Number.isInteger(b.position) ? b.position : db.prepare('SELECT COALESCE(MAX(position),0)+1 AS p FROM faqs').get().p;
  const info = db.prepare('INSERT INTO faqs (question, answer, position) VALUES (?,?,?)').run(b.question.trim(), b.answer.trim(), pos);
  res.status(201).json(db.prepare('SELECT * FROM faqs WHERE id = ?').get(info.lastInsertRowid));
});

router.put('/:id', requireAuth, (req, res) => {
  const row = db.prepare('SELECT * FROM faqs WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  const b = req.body || {};
  if (!valid(b, true)) return res.status(400).json({ error: 'question and answer must be non-empty strings' });
  db.prepare('UPDATE faqs SET question=?, answer=?, position=? WHERE id=?').run(
    b.question?.trim() ?? row.question, b.answer?.trim() ?? row.answer,
    Number.isInteger(b.position) ? b.position : row.position, row.id);
  res.json(db.prepare('SELECT * FROM faqs WHERE id = ?').get(row.id));
});

router.delete('/:id', requireAuth, (req, res) => {
  const r = db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
  if (!r.changes) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

module.exports = router;
