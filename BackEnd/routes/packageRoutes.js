const router = require('express').Router();
const { createPackage, getPackagebyId, getAllPackage, updatePackage, deletePackage, getAllDestinations, getAllTitles, getCountPackages} = require('../Controllers/packageController');

// Add packages
router.post('/add', createPackage);

//fetch all destinations
router.get('/destinations', getAllDestinations)

//fetch all titles
router.get('/titles', getAllTitles)

//count total packages
router.get('/count', getCountPackages);

// get package by Id
router.get('/:id', getPackagebyId);

// get all packages
router.post('/', getAllPackage);

//Update packages
router.patch('/:id', updatePackage);

//Update packages
router.delete('/:id', deletePackage);


module.exports = router;