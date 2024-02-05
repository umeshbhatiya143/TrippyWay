// my-backend/index.js
const express = require('express');
//const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
require('./middleware/mongoose');
//const connectToDatabase = require('./middleware/mongoose'); // Import the middleware
const userRouter = require('./routes/user');
//const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
//app.use(cors());
app.use(express.json());

// Apply the middleware to connect to MongoDB before any routes are handled
//app.use(connectToDatabase);
app.use(userRouter);


// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

//app.listen(5000)

//app.get('/',(req,res) => res.send('Testing'))
