const express = require("express");
const router = express.Router();
const {
    addTodo,
    getTodos,
    editTodo,
    deleteTodo
} = require("../controllers/todoController");
const requireAuth = require('../middleware/requireAuth');

//require auth for all todos
router.use(requireAuth);

//CRUD routes
router.post("/todo", addTodo);
router.get("/todos", getTodos);
router.patch("/todo/:id", editTodo);
router.delete("/todo/:id", deleteTodo);

module.exports = router;
