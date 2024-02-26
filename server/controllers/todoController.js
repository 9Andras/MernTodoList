const TodoModel = require("../model/todo.model");
const UserModel = require("../model/user.model");


//C.R.U.D.: Create, Read, Update, Delete
//create
async function addTodo(req, res) {
    const {userId} = req.params;
    const {title, comment, deadline} = req.body;
    const createdAt = Date.now();
    const updatedAt = null;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, error: "User not found!"});
        }
        const todoItem = new TodoModel({
            title,
            comment,
            deadline,
            createdAt,
            updatedAt
        });

        user.todos.push(todoItem);

        await Promise.all([todoItem.save(), user.save()]);

        return res.status(200).json(todoItem);
    } catch (error) {
        console.error(error);
        return res.status(400).json({success: false, error: 'failed adding todo'});
    }
}


//read
async function getTodos(req, res) {
    const {userId} = req.params;
    try {
        const user = await UserModel.findById(userId).populate('todos');
        if (!user) {
            return res.status(404).json({success: false, error: "User not found!"})
        }
        const todos = user.todos;
        return res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}

//update
async function editTodo(req, res) {
    const {userId, todoId} = req.params;
    const {title, comment, deadline} = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: "User not found!"});
        }
        const todoToUpdate = user.todos.find(todoID => todoID.toString() === todoId);
        if (!todoToUpdate) {
            return res.status(404).json({success: false, message: "Todo item not found for the user"});
        }

        const updatedTodoItem = await TodoModel.findOneAndUpdate(
            {_id: todoId},
            {
                $set: {
                    title: title !== undefined ? title : undefined,
                    comment: comment !== undefined ? comment : undefined,
                    deadline: deadline !== undefined ? deadline : undefined,
                    updatedAt: Date.now()
                },
            },
            {new: true}
        );
        if (!updatedTodoItem) {
            return res.status(404).json({success: false, error: "Todo item not found"});
        }
        return res.json(updatedTodoItem);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}

//delete
async function deleteTodo(req, res) {
    const {userId, todoId} = req.params;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, error: "User not found!"});
        }

        const todoToDelete = user.todos.find(todoID => todoID.toString() === todoId);
        if (!todoToDelete) {
            return res.status(404).json({success: false, error: "Todo item not found for the user"});
        }

        await Promise.all([TodoModel.findByIdAndDelete(todoId), user.save()]);
        res.json({success: true});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}

async function markTodoDone(req, res) {
    const {userId, todoId} = req.params;
    const {done} = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({success: false, error: "User not found"});
        }

        const todoToUpdate = await TodoModel.findOneAndUpdate(
            {_id: todoId},
            {
                $set: {
                    done: done
                }
            },
            {new: true}
        );

        return res.status(200).json({success: true, todo: todoToUpdate});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false, error: 'Failed to mark todo as done'});
    }
}

module.exports = {
    addTodo,
    getTodos,
    editTodo,
    deleteTodo,
    markTodoDone,
};
