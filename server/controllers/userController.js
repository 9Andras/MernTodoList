const UserModel = require("../model/user.model");
const {compare} = require("bcrypt");

async function loginUser(req, res) {
    const {userName, password} = req.body;
    try {
        const user = UserModel.findOne({userName});
        if (!user) {
            return res.status(400).json({message: 'User not found.'});
        }
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(400).json({message: 'Invalid password'});
        }
        user.password = null;
        return res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error.'});
    }
}

async function signUpUser(req, res) {
    const {userName, email, password} = req.body;
    try {
        const existingUser = await UserModel.findOne({userName});
        if (existingUser) {
            return res.status(400).json({message: 'Username already in use!'});
        }
        const existingEmail = await UserModel.findOne({email});
        if (existingEmail) {
            return res.status(400).json({message: 'Email address already in use!'})
        }

        //console.log(req.body);
        const createdAt = Date.now();
        const users = new UserModel({
            userName,
            email,
            password,
            createdAt,
        });
        const savedUser = await users.save();
        savedUser.password = null;
        res.json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    loginUser,
    signUpUser,
};
