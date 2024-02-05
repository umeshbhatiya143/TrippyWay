const User = require("../models/user");

exports.getUserbyId = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({user});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.getAllUser = async (req, res, next) => {
    try{
        const users = await User.find();
        if(!users)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({users});
    }catch(err){
        res.status(500).send(err.message)
    }
};

exports.signup = async (req, res, next) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send({user});
    }catch(err){
        res.status(400).send(err.message);
    }
};

exports.updateUser = async (req, res, next) => {
    try{
        const users = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!users)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({users});
    }catch(err){
        res.status(500).send(err.message)
    }
};


exports.deleteUser = async (req, res, next) => {
    try{
        const users = await User.findByIdAndDelete(req.params.id);
        if(!users)
            return res.status(404).send({ message: "No users Found."});
        res.status(200).send({users});
    }catch(err){
        res.status(500).send(err.message)
    }
};

