const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    // Create user
    const user = new User(req.body);

    //Validate input
    if (!user.email || !user.password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Save to DB
    await user.save();


    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check for user
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create token
    const token = jwt.sign({ userId: user._id, cart:user.cart, bookings: user.bookings }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error. ', error });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Validate input
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'userId and passwords are required.' });
    }

    // Check for user
    let user = await User.findById(userId);
    console.log(user)

    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

exports.getUserbyId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const fields = req.query.fields; // Access fields from query parameters

    // Convert fields query to an object suitable for MongoDB projection
    const fieldsQuery = fields.split(',').reduce((acc, field) => {
      acc[field] = 1; // Set each field you want to retrieve as 1
      return acc;
    }, {});

    const user = await User.findById(userId, fieldsQuery); // Use MongoDB's projection to select fields
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users)
      return res.status(404).send({ message: "No users Found." });
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send(err.message)
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // console.log(req.body)
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user)
      return res.status(404).send({ message: "No users Found." });
    res.status(200).send({ message: "user details updated successfully" });
  } catch (err) {
    res.status(500).send(err.message)
  }
};


exports.deleteUser = async (req, res, next) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    if (!users)
      return res.status(404).send({ message: "No users Found." });
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send(err.message)
  }
};

