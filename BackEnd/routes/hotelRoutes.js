const router = require('express').Router();
const { addHotel, getHotelbyId, getAllHotels, updateHotel, deleteHotel, getAllNames, getCountHotels } = require('../Controllers/hotelController');

// Add packages
router.post('/add', addHotel);

//get all hotel names
router.get('/names', getAllNames);

//get all hotel count
router.get('/count', getCountHotels);

// get package by Id
router.get('/:id', getHotelbyId);

// get all packages
router.post('/', getAllHotels);

//Update packages
router.patch('/:id', updateHotel);

//Update packages
router.delete('/:id', deleteHotel);


module.exports = router;