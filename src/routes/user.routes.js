import { Router } from "express";
import User from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/register", User.register);
userRouter.post("/login", User.login);
userRouter.post("/forgot-password", User.forgotPassword);
userRouter.post("/reset-password", User.resetPassword);

export default userRouter