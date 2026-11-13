// One-off: upload local files referenced as /uploads/... to R2 and rewrite the DB URLs.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const db = require('./db');

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
const PUBLIC_URL = process.env.R2_PUBLIC_URL.replace(/\/+$/, '');
const r2 = new S3Client({ region: 'auto', endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY } });
const TYPES = { '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };
const dir = path.join(__dirname, '..', 'uploads');

const TARGETS = [['activities', 'image_url'], ['projects', 'image_url'], ['carousel_slides', 'image_url'], ['settings', 'value']];

(async () => {
  await db.ready;
  for (const [table, col] of TARGETS) {
    const rows = await db.all(`SELECT ${col} AS url, ${table === 'settings' ? 'key' : 'id'} AS pk FROM ${table} WHERE ${col} LIKE '/uploads/%'`);
    for (const r of rows) {
      const name = path.basename(r.url);
      const file = path.join(dir, name);
      if (!fs.existsSync(file)) { console.warn('missing file, skipped:', name); continue; }
      await r2.send(new PutObjectCommand({ Bucket: R2_BUCKET, Key: name, Body: fs.readFileSync(file),
        ContentType: TYPES[path.extname(name)] || 'application/octet-stream', CacheControl: 'public, max-age=31536000, immutable' }));
      await db.run(`UPDATE ${table} SET ${col} = ? WHERE ${table === 'settings' ? 'key' : 'id'} = ?`, [`${PUBLIC_URL}/${name}`, r.pk]);
      console.log(`${table}: ${name} -> ${PUBLIC_URL}/${name}`);
    }
  }
  await db.pool.end();
})().catch(e => { console.error(e); process.exit(1); });
