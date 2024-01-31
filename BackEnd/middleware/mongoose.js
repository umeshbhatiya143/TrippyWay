const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
      const mongoURI = process.env.MONGO_URI; // Or await its retrieval if asynchronous
      await mongoose.connect('mongodb+srv://bugide:kachra123@cluster0.1angxtt.mongodb.net/kachraDekho'); // Remove deprecated options
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }

module.exports = connectToDatabase;