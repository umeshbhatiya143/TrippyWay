const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  mobileNo: {
    type: Number
  },
  country: {
    type: String,
  },
  pincode: {
    type: String
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  walletId: {
    type: String
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    
    // packageId: {
    //   ref: 'Package'
    // },
    // quantity: {
    //   type: Number
    // }
  }]
}, { timestamps: true });

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check the password on signin
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
