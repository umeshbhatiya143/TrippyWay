const Package = require("../models/Package");

// Middleware for error handling
const asyncMiddleware = fn => 
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

// Validation middleware (placeholder, implement based on your validation strategy)
const validatePackageInput = (req, res, next) => {
  // Implement validation logic
  // If invalid, respond with an error
  // If valid, proceed to the next middleware
  next();
};

// POST: Create a new package
exports.createPackage = async (req, res, next) => {
    try {
      // Create package object
      const package = new Package(req.body);
      
      // Validate input
      //if (!user.email || !user.password) {
      //  return res.status(400).json({ message: 'Username and password are required.' });
      //}
  
      // Check for existing Package
      const existingPackage = await Package.findOne({title: package.title });
      if (existingPackage) {
        return res.status(400).json({ message: 'Package already exists.' });
      }
      // Save to DB
      await package.save();
  
      res.status(201).json({ message: 'Package created successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.',error });
    }
};

// GET: Retrieve a single package by ID
exports.getPackagebyId = async (req, res, next) => {
    try{
        const package = await Package.findById(req.params.id);
        if(!package)
            return res.status(404).send({ message: "No packages Found."});
        res.status(200).send({package});
    }catch(err){
        res.status(500).send(err.message)
    }
};

// GET: Retrieve all packages
exports.getAllPackage = async (req, res, next) => {
    try{
        const packages = await Package.find();
        if(!packages)
            return res.status(404).send({ message: "No packages Found."});
        res.status(200).send({packages});
    }catch(err){
        res.status(500).send(err.message)
    }
};

// PUT: Update a package by ID
exports.updatePackage = async (req, res, next) => {
    try{
        const packages = await Package.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!packages)
            return res.status(404).send({ message: "No packages Found."});
        res.status(200).send({packages});
    }catch(err){
        res.status(500).send(err.message)
    }
};

// DELETE: Delete a package by ID
exports.deletePackage = async (req, res, next) => {
    try{
        const packages = await Package.findByIdAndDelete(req.params.id);
        if(!packages)
            return res.status(404).send({ message: "No packages Found."});
        res.status(200).send({packages});
    }catch(err){
        res.status(500).send(err.message)
    }
};