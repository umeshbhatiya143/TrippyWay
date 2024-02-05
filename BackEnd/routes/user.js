const router = require('express').Router();
const { getUserbyId, getAllUser, signup, updateUser, deleteUser } = require('../Controllers/user');

// get user by Id
router.get('/users/:id', getUserbyId);

// get all users
router.get('/users', getAllUser);

// Add users
router.post('/signup', signup);

//Update users
router.patch('/users/:id', updateUser);

//Update users
router.delete('/users/:id', deleteUser);


module.exports = router;