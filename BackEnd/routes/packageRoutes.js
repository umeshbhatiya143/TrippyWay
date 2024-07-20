const router = require('express').Router();
const { createPackage, getPackagebyId, getAllPackages, updatePackage, deletePackage, getAllDestinations, getAllTitles, getCountPackages, getFilteredPackage} = require('../Controllers/packageController');

// Add packages
router.post('/add', createPackage);

//fetch all destinations
router.get('/destinations', getAllDestinations)

//fetch all titles
router.get('/titles', getAllTitles)

//count total packages
router.get('/count', getCountPackages);

//get all packages
router.get('/all', getAllPackages)

// get package by Id
router.get('/:id', getPackagebyId);

// get packages based on filter
router.post('/', getFilteredPackage);

//Update packages
router.patch('/:id', updatePackage);

//Update packages
router.delete('/:id', deletePackage);


module.exports = router;