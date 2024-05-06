const Hotel = require("../models/hotel");

// // Middleware for error handling
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

// // Validation middleware (placeholder, implement based on your validation strategy)
const validatehotelInput = (req, res, next) => {
    // Implement validation logic
    // If invalid, respond with an error
    // If valid, proceed to the next middleware
    next();
};

// POST: Create a new hotel
exports.addHotel = async (req, res, next) => {
    try {

        // console.log(req.body)
        // Create hotel object
        const hotel = new Hotel(req.body);

        // Validate input
        //if (!user.email || !user.password) {
        //  return res.status(400).json({ message: 'Username and password are required.' });
        //}

        // Check for existing hotel
        //   const existingHotel = await hotel.findOne({name: hotel.name });
        //   if (existingHotel) {
        //     return res.status(400).json({ message: 'Hotel already exists.' });
        //   }
        // Save to DB
        await hotel.save();

        res.status(201).json({ message: 'Hotel added successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

// GET: Retrieve a single hotel by ID
exports.getHotelbyId = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel)
            return res.status(404).send({ message: "No hotels Found." });
        res.status(200).send({ hotel });
    } catch (err) {
        res.status(500).send(err.message)
    }
};

// GET: Retrieve all hotels
exports.getAllHotels = async (req, res, next) => {
    try {
        const { limit, page } = req.query;
        const limitValue = parseInt(limit, 10) || 10;
        const pageValue = parseInt(page, 10) || 1;
        const skip = (pageValue - 1) * limitValue;
        let { searchQuery } = req.body
        const filterObject = {name:""};

        console.log(limit, page)
        
        if (searchQuery.title) {
            filterObject['name'] = { $in: searchQuery.title };
        }

        const hotels = (filterObject.name === "" || Object.keys(filterObject).length === 0)
            ? await Hotel.find().sort({ createdAt: -1 }).skip(skip).limit(limitValue)
            : await Hotel.find(filterObject).sort({ createdAt: -1 }).skip(skip).limit(limitValue);

        if (!hotels) {
            return res.status(404).send({ message: "No packages found." });
        }

        res.status(200).send(hotels);
    } catch (err) {
        res.status(500).send(err.message)
    }
};
exports.getAllNames = async (req, res, next) => {
    try {
        // Fetch all hotels
        const hotels = await Hotel.find({}, '_id name');

        // Return the list of hotel names and ids
        res.status(200).json(hotels.map(hotel => ({ id: hotel._id, name: hotel.name })));
    } catch (error) {
        // Handle errors
        console.error('Error fetching hotel names:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getCountHotels = async (req, res, next) => {
    try {
        // Use distinct to get unique destinations from all packages
        const hotels = await Hotel.find();

        // Return the list of destinations
        res.status(200).json(hotels.length);
    } catch (error) {
        // Handle errors
        console.error('Error fetching destinations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT: Update a hotel by ID
exports.updateHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hotel)
            return res.status(404).send({ message: "No hotels Found." });
        res.status(200).send(hotel);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

// DELETE: Delete a hotel by ID
exports.deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel)
            return res.status(404).send({ message: "No hotels Found." });
        res.status(200).send(hotel);
    } catch (err) {
        res.status(500).send(err.message)
    }
};