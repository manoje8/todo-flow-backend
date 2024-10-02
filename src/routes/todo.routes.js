import { Router } from "express";
import Todo from "../controller/todo.controller.js";
import { verifyAccessToken } from "../utils/jwtHelper.js";

const todoRouter = Router()

// Route to get all todos
todoRouter.get("/", verifyAccessToken, Todo.getTodos);

// Route to add a new todo
todoRouter.post("/", verifyAccessToken ,Todo.addTodo);

// Route to get add todos by category Id
todoRouter.get("/:id", verifyAccessToken, Todo.getTodoByCategoryId)

// Route to edit an existing todo
todoRouter.put("/:todoId", Todo.editTodo);

// Route to delete a todo
todoRouter.delete("/:todoId", Todo.deleteTodo);

export default todoRouter