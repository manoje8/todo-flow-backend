import todoModel from "../model/todo.model.js";
import userModel from "../model/user.model.js";

class Todo
{
    static async getTodos(req, res, next)
    {
        const {aud} = req.payload;
        try 
        {
            const todos = await todoModel.find({userId: aud});
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
        const {title, note, location, date, status} = req.body
        const {aud} = req.payload;
        
        try 
        {
            const user = await userModel.findById(aud)

            if(!user) return res.status(404).send({error: "User not found"})

            const newTodo = await todoModel.create({
                title,
                note,
                location,
                date,
                status,
                userId: aud
            })
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