import { Router } from "express";
import Todo from "../controller/todo.controller.js";

const todoRouter = Router()

// Route to get all todos
todoRouter.get("/", Todo.getTodos);

// Route to add a new todo
todoRouter.post("/", Todo.addTodo);

// Route to edit an existing todo
todoRouter.put("/:todoId", Todo.editTodo);

// Route to delete a todo
todoRouter.delete("/:todoId", Todo.deleteTodo);

export default todoRouter