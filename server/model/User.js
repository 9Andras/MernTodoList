const mongoose = require('mongoose');
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

const UserModel = model('UserModel', userSchema);

module.exports = UserModel;
