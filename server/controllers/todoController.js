const TodoModel = require("../model/todo.model");
const UserModel = require("../model/user.model");


//C.R.U.D.: Create, Read, Update, Delete
//create
async function addTodo(req, res) {
    console.log(req.body);
    const {title, comment} = req.body;
    const {userId} = req.params;
    const createdAt = Date.now();

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: "User not found!"});
        }
        const todoItem = new TodoModel({title, comment, createdAt});
        user.todos.push(todoItem);
        await Promise.all([todoItem.save(), user.save()]);

        res.json(todoItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}


//read
async function getTodos(req, res) {
    const {userId} = req.params;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: "User not found!"})
        }
        const todos = user.todos.populate().sort({createdAt: -1});
        return res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}

//update
async function editTodo(req, res) {
    const {userId, id} = req.params;
    const {title, comment} = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: "User not found!"});
        }
        const todoToUpdate = user.todos.find(todoId => todoId.toString() === id);
        if (!todoToUpdate) {
            return res.status(404).json({success: false, message: "Todo item not found for the user"});
        }

        const updatedTodoItem = await TodoModel.findOneAndUpdate(
            {_id: id},
            {
                $set: {
                    title: title !== undefined ? title : undefined,
                    comment: comment !== undefined ? comment : undefined
                },
            },
            {new: true}
        );
        if (!updatedTodoItem) {
            return res.status(404).json({success: false, message: "Todo item not found"});
        }
        return res.json(updatedTodoItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}

//delete
async function deleteTodo(req, res) {
    const {userId, id} = req.params;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: "User not found!"});
        }

        const todoToDelete = user.todos.find(todoId => todoId.toString() === id);
        if (!todoToDelete) {
            return res.status(404).json({success: false, message: "Todo item not found for the user"});
        }

        await Promise.all([TodoModel.findByIdAndDelete(id), user.save()]);
        res.json({success: true});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}

module.exports = {
    addTodo,
    getTodos,
    editTodo,
    deleteTodo,
};
