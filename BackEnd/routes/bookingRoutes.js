const router = require('express').Router();
const { createBooking, getAllBookings, getBookingbyId } = require('../Controllers/bookingController');

// Add packages
router.post('/create', createBooking);

// get package by Id
router.get('/:id', getBookingbyId);

// get all packages
router.get('/', getAllBookings);


module.exports = router;