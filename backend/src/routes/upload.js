const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Admin: generic image upload -> { image_url }. Use the returned URL in image_url fields.
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Attach an image in field "image"' });
  res.status(201).json({ image_url: '/uploads/' + req.file.filename });
});

module.exports = router;
