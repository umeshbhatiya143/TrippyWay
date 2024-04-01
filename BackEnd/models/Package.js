const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
      required: true,
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  description: {
    type: String,
    required: true,
  },
  activities: {
    type: String,
  },
  included: [String],
  destination: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    }
  ],
  hotels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
    }
  ],
}, { timestamps: true });



module.exports = mongoose.model('Package', packageSchema);