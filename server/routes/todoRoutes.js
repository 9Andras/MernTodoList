const express = require("express");
const router = express.Router();
const {
    addTodo,
    getTodos,
    editTodo,
    deleteTodo,
    markTodoDone
} = require("../controllers/todoController");
const requireAuth = require('../middleware/requireAuth');

//require auth for all todos
router.use(requireAuth);

//CRUD routes
router.post("/:userId/todo", addTodo);
router.get("/:userId/todos", getTodos);
router.patch("/:userId/todo/:todoId/done", markTodoDone)
router.patch("/:userId/todo/:todoId", editTodo);
router.delete("/:userId/todo/:todoId", deleteTodo);

module.exports = router;
