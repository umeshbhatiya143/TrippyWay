const mongoose = require('mongoose');
const User = require("../models/user");
/*
async function connectToDatabase() {
    try {
      const mongoURI = process.env.MONGO_URI; // Or await its retrieval if asynchronous
      await mongoose.connect('mongodb+srv://trippywayteam:TrippyWay123@trippyway.jghm6ls.mongodb.net/TrippyWay') // Remove deprecated options
      .then(res => console.log('Database Connected' ))
      .catch(err => console.log(err))
      console.log('MongoDB connected successfully');

      /*const user = new User({
        name: 'Rohit Kumar',
        username: 'rk',
        email: 'r@g.c',
        password: 'abc'
      });
      user.save()
      .then(res => console.log(res))
      .catch(err => console.log(err))


    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
    return 'good';
  }

module.exports = connectToDatabase;
*/

mongoose.connect('mongodb+srv://trippywayteam:TrippyWay123@trippyway.jghm6ls.mongodb.net/TrippyWay')