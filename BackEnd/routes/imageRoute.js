const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage } = require('../Controllers/imageController');
const multer = require('multer');
const storage = multer.memoryStorage(); // or use diskStorage if you prefer
const upload = multer({ storage: storage });

// POST endpoint for uploading an image
router.post('/upload-image', upload.single('photo'), uploadImage);

router.delete('/delete-image',deleteImage)

module.exports = router;
