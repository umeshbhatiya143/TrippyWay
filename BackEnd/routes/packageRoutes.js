const router = require('express').Router();
const { createPackage, getPackagebyId, getAllPackage, updatePackage, deletePackage } = require('../Controllers/packageController');

// Add packages
router.post('/add', createPackage);

// get package by Id
router.get('/:id', getPackagebyId);

// get all packages
router.get('/', getAllPackage);

//Update packages
router.patch('/:id', updatePackage);

//Update packages
router.delete('/:id', deletePackage);


module.exports = router;