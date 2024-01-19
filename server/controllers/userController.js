const UserModel = require("../model/User");
const {compare} = require("bcrypt");

async function loginUser(req, res){
    try {
        const {userName, password} = req.body;
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

async function signUpUser(req,res) {
    try {
        console.log(req.body);
        const {userName, password} = req.body;
        const createdAt = Date.now();
        const users = new UserModel({
            userName,
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
