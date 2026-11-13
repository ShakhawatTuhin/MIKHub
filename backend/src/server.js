require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

for (const v of ['JWT_SECRET', 'ADMIN_PASSWORD_HASH', 'R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_PUBLIC_URL']) {
  if (!process.env[v]) {
    console.error(`Missing ${v} in .env (see .env.example)`);
    process.exit(1);
  }
}

const app = express();
const origins = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',').map(s => s.trim());

app.disable('x-powered-by');
app.use(cors({ origin: origins, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'), {
  setHeaders: res => res.set('X-Content-Type-Options', 'nosniff'),
}));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/carousel', require('./routes/carousel'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/upload', require('./routes/upload'));

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'Image too large (max 5 MB)' });
  if (err.name === 'MulterError') return res.status(400).json({ error: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
  if (err.status && err.status < 500) return res.status(err.status).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const port = process.env.PORT || 3000;
require('./db').ready
  .then(() => app.listen(port, () => console.log(`MIK-HUB API on http://localhost:${port}`)))
  .catch(err => { console.error('Database connection failed:', err.message); process.exit(1); });
