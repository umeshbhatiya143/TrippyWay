const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    location: [{
      type: String,
      required: true
    }],
    rating: {
      type: Number,
    },
    description: {
      type: String
    },
    availability: {
        type: Boolean
      },
    amenities: [{
      type: String
    }],
    price: {
      type: Number,
      required: true
    },
    images: [{
      type: String
    }],
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);



