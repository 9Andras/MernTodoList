const UserModel = require("../model/user.model");
const { compare } = require("bcrypt");
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
};


async function loginUser(req, res) {
    const { userName, password } = req.body;

    try {
        //check if fields filled out
        if (!userName || !password) {
            return res.status(422).json({ error: 'Username and password fields must be filled' });
        }

        //find user if exists, return error if not
        const user = await UserModel.findOne({ userName });
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        //compare hashed passwords
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        //create token
        const token = createToken(user._id);
        //don't send password
        user.password = null;
        //send response
        return res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}

async function signupUser(req, res) {
    const { userName, email, password } = req.body;

    try {
        //input and "already in use" checks
        if (!userName || !email || !password) {
            return res.status(422).json({ error: 'All fields must be filled' });
        }
        if (!validator.isEmail(email)) {
            return res.status(422).json({ error: 'Email is not valid' });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(422).json({ error: 'Password not strong enough' });
        }

        const existingUser = await UserModel.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already in use!' });
        }
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email address already in use!' });
        }

        //add createdAt value
        const createdAt = Date.now();

        //saving the user to db
        const userToSave = new UserModel({
            userName,
            email,
            password,
            createdAt,
        });
        const user = await userToSave.save();
        //create token
        const token = createToken(user._id)
        //don't send password to frontend
        user.password = null;
        //returning response
        return res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = {
    loginUser,
    signupUser,
};
