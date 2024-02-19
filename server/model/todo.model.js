const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const todoSchema = new Schema({
    title: String,
    comment: String,
    createdAt: Date,
});

const TodoModel = model('Todo', todoSchema);

module.exports = TodoModel;
