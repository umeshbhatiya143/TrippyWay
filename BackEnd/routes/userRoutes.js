const router = require('express').Router();
const { signup, login, getUserbyId, getAllUser, updateUser, deleteUser, changePassword, getCountUsers } = require('../Controllers/userController');

// Add users
router.post('/signup', signup);

// Login route
router.post('/login', login);

//update password
router.patch('/change-password', changePassword)

//count all users
router.get('/count', getCountUsers)

// get user by Id
router.get('/:id', getUserbyId);

// get all users
router.get('/', getAllUser);

//Update users
router.patch('/:id', updateUser);

//Update users
router.delete('/:id', deleteUser);


module.exports = router;