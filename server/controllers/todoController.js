const TodoModel = require("../model/Todo");


//C.R.U.D.: Create, Read, Update, Delete
//create
async function addTodo(req, res) {
    console.log(req.body);
    const {title, comment} = req.body;
    const createdAt = Date.now();

    try {
        const todolist = new TodoModel({title, comment, createdAt});
        const savedList = await todolist.save();
        res.json(savedList);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}


//read
async function getTodos(req,res){
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false});
    }
}

//update
async function editTodo(req, res) {
    const {id} = req.params;
    const {title, comment} = req.body;

    try {
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
async function deleteTodo(req, res){
    const {id} = req.params;

    try {
        await TodoModel.findByIdAndDelete(id);
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
