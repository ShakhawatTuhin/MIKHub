const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };

const make = (maxFiles) => multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => cb(null, crypto.randomBytes(16).toString('hex') + EXT[file.mimetype]),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: maxFiles },
  fileFilter: (req, file, cb) => {
    if (EXT[file.mimetype]) return cb(null, true);
    cb(Object.assign(new Error('Only JPEG, PNG, WebP or GIF images are allowed'), { status: 400 }));
  },
});

const upload = make(1);
const uploadMany = make(10);

/** Delete a previously uploaded local file (ignores external URLs). */
function removeUploaded(url) {
  if (!url || !url.startsWith('/uploads/')) return;
  const file = path.join(UPLOAD_DIR, path.basename(url));
  fs.unlink(file, () => {});
}

module.exports = { upload, uploadMany, removeUploaded, UPLOAD_DIR };
