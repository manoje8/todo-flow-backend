import { Router } from "express";
import Category from "../controller/category.controller.js";
import { verifyAccessToken } from "../utils/jwtHelper.js";

const categoryRouter = Router()

categoryRouter.get('/', verifyAccessToken,Category.getCategory)
categoryRouter.post('/', verifyAccessToken, Category.addCategory)
categoryRouter.delete('/:id', Category.deleteCategory)

export default categoryRouter