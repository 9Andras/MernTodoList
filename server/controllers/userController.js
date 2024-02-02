const UserModel = require("../model/user.model");
const {compare} = require("bcrypt");
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const createToken = (_id, userName) => {
    return jwt.sign({_id, userName}, process.env.SECRET, {expiresIn: '3d'})
};


async function loginUser(req, res) {
    const {userName, password} = req.body;

    if (!userName || !password) {
        return res.status(422).json({message: 'Username and password fields must be filled'});
    }
    try {
        const user = UserModel.findOne({userName});
        if (!user) {
            return res.status(400).json({message: 'User not found.'});
        }

        const match = await compare(password, user.password);
        if (!match) {
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = createToken(user._id);

        user.password = null;

        return res.status(200).json({user, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error.'});
    }
}

async function signupUser(req, res) {
    const {userName, email, password} = req.body;
    try {
        if (!userName || !email || !password) {
            return res.status(422).json({error: 'All fields must be filled'});
        }
        if (!validator.isEmail(email)) {
            return res.status(422).json({error: 'Email is not valid'});
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(422).json({error: 'Password not strong enough'});
        }

        const existingUser = await UserModel.findOne({userName});
        if (existingUser) {
            return res.status(400).json({error: 'Username already in use!'});
        }
        const existingEmail = await UserModel.findOne({email});
        if (existingEmail) {
            return res.status(400).json({error: 'Email address already in use!'});
        }

        const createdAt = Date.now();
        const userToSave = new UserModel({
            userName,
            email,
            password,
            createdAt,
        });
        const savedUser = await userToSave.save();

        const token = createToken(savedUser._id)

        savedUser.password = null;
        return res.status(200).json({savedUser, token});
    } catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({error: error.message});
        } else {
            return res.status(500).json({error: 'Server error'});
        }
    }
}

module.exports = {
    loginUser,
    signupUser,
};
