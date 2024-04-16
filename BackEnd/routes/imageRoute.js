const express = require('express');
const router = express.Router();
const { uploadImage } = require('../Controllers/imageController');
const multer = require('multer');
const storage = multer.memoryStorage(); // or use diskStorage if you prefer
const upload = multer({ storage: storage });

// POST endpoint for uploading an image
router.post('/upload-image', upload.single('photo'), uploadImage);

module.exports = router;
