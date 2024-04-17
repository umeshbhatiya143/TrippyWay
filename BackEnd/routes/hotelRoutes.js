const router = require('express').Router();
const { addHotel, getHotelbyId, getAllHotels, updateHotel, deleteHotel } = require('../Controllers/hotelController');

// Add packages
router.post('/add', addHotel);

// get package by Id
router.get('/:id', getHotelbyId);

// get all packages
router.get('/', getAllHotels);

//Update packages
router.patch('/:id', updateHotel);

//Update packages
router.delete('/:id', deleteHotel);


module.exports = router;