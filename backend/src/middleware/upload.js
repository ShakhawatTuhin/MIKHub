const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// Cloudflare R2 (S3-compatible). Images are stored in the bucket and the full public URL is saved in the database.
const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

// Legacy: images uploaded before the R2 switch live on local disk and are still served from /uploads.
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };

const make = (maxFiles) => multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: maxFiles },
  fileFilter: (req, file, cb) => {
    if (EXT[file.mimetype]) return cb(null, true);
    cb(Object.assign(new Error('Only JPEG, PNG, WebP or GIF images are allowed'), { status: 400 }));
  },
});

/** After multer parsed the files into memory: push each to R2 and set file.url (public URL). */
async function toR2(req, res, next) {
  const files = req.files || (req.file ? [req.file] : []);
  const done = [];
  try {
    for (const f of files) {
      const key = crypto.randomBytes(16).toString('hex') + EXT[f.mimetype];
      await r2.send(new PutObjectCommand({
        Bucket: R2_BUCKET, Key: key, Body: f.buffer, ContentType: f.mimetype,
        CacheControl: 'public, max-age=31536000, immutable',
      }));
      f.filename = key;
      f.url = `${PUBLIC_URL}/${key}`;
      done.push(f);
      delete f.buffer;
    }
    next();
  } catch (e) {
    done.forEach(f => removeUploaded(f.url));
    console.error('R2 upload failed:', e.message);
    next(Object.assign(new Error('Image upload failed'), { status: 502 }));
  }
}

// upload.single('image') / uploadMany.array('images', 10) return [multer, toR2] — Express accepts middleware arrays.
const wrap = (m) => ({
  single: (field) => [m.single(field), toR2],
  array: (field, max) => [m.array(field, max), toR2],
});
const upload = wrap(make(1));
const uploadMany = wrap(make(10));

/** Delete a previously uploaded image (R2 object or legacy local file). Ignores external URLs. */
function removeUploaded(url) {
  if (!url) return;
  if (PUBLIC_URL && url.startsWith(PUBLIC_URL + '/')) {
    const Key = url.slice(PUBLIC_URL.length + 1);
    r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key })).catch(e => console.error('R2 delete failed:', e.message));
  } else if (url.startsWith('/uploads/')) {
    fs.unlink(path.join(UPLOAD_DIR, path.basename(url)), () => {});
  }
}

module.exports = { upload, uploadMany, removeUploaded, UPLOAD_DIR };
