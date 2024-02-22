const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const UserModel = model('User', userSchema);

module.exports = UserModel;
