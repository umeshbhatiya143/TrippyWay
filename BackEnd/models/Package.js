const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  datesAvailable: [{
    type: Date
  }],
  destinations: [{
    type: String
  }],
  itinerary: [{
    type: String
  }],
  inclusions: [{
    type: String
  }],
  exclusions: [{
    type: String
  }],
  hotels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
    }
  ],
  transportation: {
    type: String
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number
  },
  reviews: [{
    user: {
      type: String
    },
    comment: {
      type: String
    },
    rating: {
      type: Number
    }
  }],
  numberOfBookingsMade: {
    type: Number
  },
  availableSpots: {
    type: Number
  },

  cancellationPolicy: {
    type: String
  },
  paymentOptions: [{
    type: String
  }],
  minimumGroupSize: {
    type: Number
  },
  maximumGroupSize: {
    type: Number
  },
  ageRestrictions: {
    type: Number
  },
  healthAndSafetyMeasures: {
    type: String
  },
  specialOffers: {
    type: String
  },
  tagsKeywords: [{
    type: String
  }],
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);