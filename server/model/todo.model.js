const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const todoSchema = new Schema({
    title: String,
    comment: String,
    deadline: Date,
    createdAt: Date,
    updatedAt: Date,
    done: {
        type: Boolean,
        default: false
    }
});

const TodoModel = model('Todo', todoSchema);

module.exports = TodoModel;
