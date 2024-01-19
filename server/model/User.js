const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    userName: String,
    password: String,
    createdAt: Date,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const UserModel = model('UserModel', userSchema);

module.exports = UserModel;
