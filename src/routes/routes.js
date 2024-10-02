import express from 'express'
import todoRouter from './todo.routes.js'
import userRouter from './user.routes.js'
import categoryRouter from './category.routes.js'

const router = express()

router.use("/api/todos", todoRouter)
router.use("/api/todos/category", categoryRouter)
router.use("/auth", userRouter)

export default router