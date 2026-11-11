const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: 'Too many login attempts, try again later' },
});

const cookieOpts = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.COOKIE_SECURE === 'true',
  maxAge: 8 * 60 * 60 * 1000,
});

router.post('/login', loginLimiter, async (req, res) => {
  const { password } = req.body || {};
  if (typeof password !== 'string' || !password) return res.status(400).json({ error: 'Password required' });
  const ok = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!ok) return res.status(401).json({ error: 'Incorrect password' });
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.cookie('token', token, cookieOpts());
  res.json({ ok: true });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { ...cookieOpts(), maxAge: undefined });
  res.json({ ok: true });
});

router.get('/me', (req, res) => {
  try {
    const p = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    res.json({ authenticated: p.role === 'admin' });
  } catch {
    res.json({ authenticated: false });
  }
});

module.exports = router;
