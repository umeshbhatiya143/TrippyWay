const router = require('express').Router();
const mongoose = require('mongoose')
const User = require('../models/user');


// get all users
router.post('/', async (req, res) => {
    try {
        const data = await User.find({});
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;