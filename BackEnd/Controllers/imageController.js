const cloudinary = require('../config/cloudinaryConfig');
const { Readable } = require('stream');

// Function to upload image to Cloudinary
exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).send('No image file provided.');

  try {
    // Convert buffer to a readable stream
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null); // Indicates the end of the stream

    // Upload the image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        folder: 'TrippyWay' // specify the folder name in Cloudinary
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });

      readableStream.pipe(uploadStream);
    });

    // Assume the user ID is passed through some means (e.g., a session or a token)
    // You would typically now update the user's profile in your database with the new image URL:
    // await User.findByIdAndUpdate(userId, { profilePicture: result.url });

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: result.url
    });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};
