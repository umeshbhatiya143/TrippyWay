const Package = require("../models/Package");

// // Middleware for error handling
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

// // Validation middleware (placeholder, implement based on your validation strategy)
const validatePackageInput = (req, res, next) => {
    // Implement validation logic
    // If invalid, respond with an error
    // If valid, proceed to the next middleware
    next();
};

// POST: Create a new pack
exports.createPackage = async (req, res, next) => {
    try {

        // console.log(req.body)
        // Create pack object
        const pack = new Package(req.body);

        // Validate input
        //if (!user.email || !user.password) {
        //  return res.status(400).json({ message: 'Username and password are required.' });
        //}

        // Check for existing Package
        const existingPackage = await Package.findOne({ title: pack.title });
        if (existingPackage) {
            return res.status(400).json({ message: 'Package already exists.' });
        }
        // Save to DB
        await pack.save();

        res.status(201).json({ message: 'Package created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

// GET: Retrieve a single pack by ID
exports.getPackagebyId = async (req, res, next) => {
    try {
        const pack = await Package.findById(req.params.id);
        if (!pack)
            return res.status(404).send({ message: "No packs Found." });
        res.status(200).send({ pack });
    } catch (err) {
        res.status(500).send(err.message)
    }
};

// GET: Retrieve all packs
// exports.getAllPackage = async (req, res, next) => {

//     try{
//         const { limit, page} = req.query;
//         // console.log(limit, page)
//         const limitValue = parseInt(limit, 10) || 10;
//         const pageValue = parseInt(page, 10) || 1;
//         const skip = (pageValue - 1) * limitValue;
//         // console.log(limitValue, skip, pageValue)
//         const packs = await Package.find().sort({ createdAt: -1 }).skip(skip).limit(limitValue);
//         if(!packs)
//             return res.status(404).send({ message: "No packs Found."});
//         res.status(200).send({packs});
//     }catch(err){
//         res.status(500).send(err.message)
//     }
// };

exports.getAllPackage = async (req, res, next) => {
    try {
        const monthMap = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
        };

        const { limit, page } = req.query;
        const limitValue = parseInt(limit, 10) || 10;
        const pageValue = parseInt(page, 10) || 1;
        const skip = (pageValue - 1) * limitValue;
        let { filters, searchQuery } = req.body
        const filterObject = {};


        // Add filters based on the categories
        const selectedCategories = Object.entries(filters?.categories)
            .filter(([category, selected]) => selected)
            .map(([category]) => category);

        if (selectedCategories.length > 0) {
            filterObject['categories'] = { $in: selectedCategories };
        }

        //add filters based on the duration
        const selectedDurations = Object.entries(filters?.duration)
            .filter(([duration, selected]) => selected)
            .map(([duration]) => duration);

        if (selectedDurations.length > 0) {
            let minDuration = Infinity;
            let maxDuration = -Infinity;
            selectedDurations.forEach(duration => {
                if (duration === '7+') {
                    minDuration = 7;
                    maxDuration = Infinity;
                }
                else if (duration !== '7+') {
                    const [min, max] = duration.split('-').map(value => parseInt(value, 10));
                    // console.log(min, max)
                    minDuration = Math.min(minDuration, min);
                    maxDuration = Math.max(maxDuration, max);
                }
            });

            const durationFilter = {
                $gte: minDuration,
                $lte: maxDuration
            };

            filterObject['duration'] = durationFilter;
        }

        //add filter based on budget
        const selectedPrices = Object.entries(filters?.budgetPerPerson)
            .filter(([price, selected]) => selected)
            .map(([price]) => price);

        if (selectedPrices.length > 0) {
            let minPrice = Infinity;
            let maxPrice = -Infinity;
            selectedPrices.forEach(price => {

                if (price === 'Less Than 10000') {
                    // console.log(price)
                    minPrice = 0;
                    maxPrice = 10000;
                }
                else if (price === 'Above 80000') {
                    minPrice = 80000;
                    maxPrice = Infinity;
                }
                else if (price !== 'Less Than 10000' && price !== 'Above 80000') {
                    const [min, max] = price.split('-').map(value => parseInt(value, 10));
                    // console.log(min, max)
                    minPrice = Math.min(minPrice, min);
                    maxPrice = Math.max(maxPrice, max);
                }
            });

            const priceFilter = {
                $gte: minPrice,
                $lte: maxPrice
            };

            filterObject['price'] = priceFilter;
        }

        //add filter based on inclusions
        const selectedInclusions = Object.entries(filters?.inclusions)
            .filter(([inclusion, selected]) => selected)
            .map(([inclusion]) => inclusion);;

        if (selectedInclusions.length > 0) {
            filterObject['inclusions'] = { $in: selectedInclusions };
        }

        //search query based on destination
        if (searchQuery.destination) {
            filterObject['destinations'] = { $in: searchQuery.destination };
        }

        //search query based on title
        if(searchQuery.title){
            filterObject['title'] = { $in: searchQuery.title };
        }

        // if (searchQuery.month) {
        //     const month = monthMap[searchQuery.month];
        //     if (month) {
        //         filterObject['datesAvailable'] = {
        //             $elemMatch: {
        //                 $expr: { "$eq": [{ "$month": "$$this" }, month] }
        //             }
        //         };
        //     }
        // }
        // console.log(filterObject)



        // Fetch packs based on the constructed filter object
        const packs = Object.keys(filterObject).length === 0
            ? await Package.find().sort({ createdAt: -1 }).skip(skip).limit(limitValue)
            : await Package.find(filterObject).sort({ createdAt: -1 }).skip(skip).limit(limitValue);

        if (!packs) {
            return res.status(404).send({ message: "No packs found." });
        }
        res.status(200).send({ packs });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getAllDestinations = async (req, res, next) => {
    try {
        // Use distinct to get unique destinations from all packs
        const destinations = await Package.distinct('destinations');

        // Return the list of destinations
        res.status(200).json(destinations);
    } catch (error) {
        // Handle errors
        console.error('Error fetching destinations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllTitles = async (req, res, next) => {
    try {
        // Use distinct to get unique destinations from all packs
        const titles = await Package.distinct('title');

        // Return the list of destinations
        res.status(200).json(titles);
    } catch (error) {
        // Handle errors
        console.error('Error fetching destinations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCountPackages = async (req, res, next) => {
    try {
        // Use distinct to get unique destinations from all packs
        const packs = await Package.find();

        // Return the list of destinations
        res.status(200).json(packs.length);
    } catch (error) {
        // Handle errors
        console.error('Error fetching destinations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT: Update a pack by ID
exports.updatePackage = async (req, res, next) => {
    try {
        const packs = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!packs)
            return res.status(404).send({ message: "No packs Found." });
        res.status(200).send({ packs });
    } catch (err) {
        res.status(500).send(err.message)
    }
};

// DELETE: Delete a pack by ID
exports.deletePackage = async (req, res, next) => {
    try {
        const packs = await Package.findByIdAndDelete(req.params.id);
        if (!packs)
            return res.status(404).send({ message: "No packs Found." });
        res.status(200).send({ packs });
    } catch (err) {
        res.status(500).send(err.message)
    }
};