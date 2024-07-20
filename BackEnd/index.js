// my-backend/index.js
const express = require('express');
const Razorpay =require('razorpay');
const crypto =require('crypto');
//const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('./middleware/mongoose');
//const connectToDatabase = require('./middleware/mongoose'); // Import the middleware
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');
const imageRoutes = require('./routes/imageRoute');
const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes')

const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Apply the middleware to connect to MongoDB before any routes are handled
//app.use(connectToDatabase);
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);


//api for RazorPay

app.post("/order", async (req, res) => {

   try {

       const razorpay = new Razorpay({
           key_id: process.env.RAZORPAY_KEY_ID,
           key_secret: process.env.RAZORPAY_KEY_SECRET
       });

       if(!req.body){
           return res.status(400).send("Bad Request");

       }
       const options = req.body;

       const order = await razorpay.orders.create(options);

       if(!order){
           return res.status(400).send("Bad Request");
       }

       res.json(order);
       console.log("order api: ", order);
       
   } catch (error) {
       console.log(error);
       res.status(500).send(error);
   }
})

//api to validate
app.post("/validate", async (req, res) => {

   const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

   const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
   // order_id + " | " + razorpay_payment_id

   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

   const digest = sha.digest("hex");

   if (digest!== razorpay_signature) {
       return res.status(400).json({msg: " Transaction is not legit!"});
   }

   res.json({msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
}) 

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

