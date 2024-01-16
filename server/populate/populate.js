require("dotenv").config({path: "../.env"});
const mongoose = require("mongoose");

const users = require("./users.json");
const todos = require("./todos.json");

const TodoList = require("../model/Todo.js");
const UserModel = require("../model/User.js");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateUsers = async (createdTodos) => {
    await UserModel.deleteMany({});

    for (const user of users) {
        const createdUser = await UserModel.create(user);

        //Select 3 random todos from the createdTodos array
        const randomTodos = [];
        for (let i = 0; i < 3; i++) {
            const randomTodo = pick(createdTodos);
            randomTodos.push(randomTodo);
        }

        //Add the selected todos to the user's todos array
        createdUser.todos = randomTodos;

        //Save the user with the updated todos array
        await createdUser.save();
    }

    console.log("Users created!");
};


const populateTodos = async () => {
    await TodoList.deleteMany({});
    const createdTodos = await TodoList.create(...todos);
    console.log("Todos created!");

    await populateUsers(createdTodos);
};


const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateTodos();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
