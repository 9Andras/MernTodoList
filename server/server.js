require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const TodoModel = require('./model/Todo.js');
const UserModel = require('./model/User.js');

const {MONGO_URL, PORT = 8080} = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); //exit the current program
}

const app = express();
app.use(express.json());


async function startServer() {
    try {
        console.log('Connecting to the database...');
        await mongoose.connect(MONGO_URL);
        console.log('Database connection established!');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


//Endpoints here:

//login
app.post('/api/users/login', async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = UserModel.findOne({userName});
        if (!user) {
            return res.status(400).json({message: 'User not found.'});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({message: 'Invalid password'});
        }
        user.password = null;
        return res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error.'});
    }
});


//register
app.post('/api/users/signUp', async (req, res) => {
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
})


//get todos
app.get('/api/todo', async (req, res) => {
    try {
        const todos = await TodoList.find();
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
});

//add todo
app.post('/api/todo', async (req, res) => {
    console.log(req.body);
    const {title, comment} = req.body;
    const createdAt = Date.now();

    try {
        const todolist = new TodoList({title, comment, createdAt});
        const savedList = await todolist.save();
        res.json(savedList);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
});

//delete todo
app.delete('/api/todo/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await TodoList.findByIdAndDelete(id);
        res.json({success: true});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
});

//edit todo
app.patch('/api/todo/:id', async (req, res) => {
    const {id} = req.params;
    const {title, comment} = req.body;

    try {
        let todoItem = await TodoList.findOne({_id: id});

        if (req.body && title !== undefined) {
            todoItem.title = title;
        }

        if (req.body && comment !== undefined) {
            todoItem.comment = comment;
        }

        todoItem = await todoItem.save();
        res.json(todoItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
});

startServer();
