import todoModel from "../model/todo.model.js";

class Todo
{
    static async getTodos(req, res, next)
    {
        try 
        {
            const todos = await todoModel.find();
            res.status(200).send(todos)
        } 
        catch (error) 
        {
            console.log("Error in fetching data: ", error);
            next(error)
        }
    }
    
    static async addTodo (req, res, next)
    {
        try 
        {
            const newTodo = await todoModel.create(req.body)
            res.status(200).send(newTodo)
        } 
        catch (error) 
        {
            console.log("Error in adding data: ", error);
            next(error)
        }
    }

    static async editTodo (req, res, next)
    {
        const { todoId } = req.params
        const { updateNote } = req.body;

        try 
        {
            const updatedTodo = await todoModel.findByIdAndUpdate(todoId, updateNote, {new: true})
            if(!updatedTodo) return res.status(404).send({error: "Todo not found"})

            res.status(200).send(updatedTodo)
        } 
        catch (error) 
        {
            console.log("Error in updating data: ", error);
            next(error)
        }
    }

    static async deleteTodo(req, res, next)
    {
        const { todoId } = req.params
        try 
        {
            const deleteTodo = await todoModel.findByIdAndDelete(todoId)
            if(!deleteTodo) return res.status(404).send({error: "Todo not found"})
            
            res.status(200).send({ message: "Todo deleted successfully", todoId })
        } 
        catch (error) 
        {
            console.log("Error in deleting data: ", error);
            next(error)
        }
    }
}

export default Todo