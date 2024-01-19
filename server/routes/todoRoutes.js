const express = require("express");
const router = express.Router();
const {addTodo, getTodos, editTodo, deleteTodo} = require("../controllers/todoController");

router.post("/:id/todo", addTodo);
router.get("/:id/todos", getTodos);
router.patch("/:id/todo/:id", editTodo);
router.delete("/:id/todo/:id", deleteTodo);

module.exports = router;
