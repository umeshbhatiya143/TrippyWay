const router = require('express').Router();
const { signup, login, getUserbyId, getAllUser, updateUser, deleteUser } = require('../Controllers/userController');

// Add users
router.post('/signup', signup);

// Login route
router.post('/login', login);

// get user by Id
router.get('/:id', getUserbyId);

// get all users
router.get('/', getAllUser);

//Update users
router.patch('/:id', updateUser);

//Update users
router.delete('/:id', deleteUser);


module.exports = router;