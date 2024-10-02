import categoryModel from "../model/category.model.js";
import todoModel from "../model/todo.model.js";
import userModel from "../model/user.model.js";

class Category
{
    static async addCategory(req, res, next)
    {
        const {listName, color, icon} = req.body
        const { aud } = req.payload
        try 
        {

            const existName = await categoryModel.findOne({listName})
            if(existName)  return res.status(400).send('Already exist') // List name must be unique

            const user = await userModel.findById(aud)
            if (!user) return res.status(404).json('User not found');           

            const newCategory = await categoryModel.create({
                listName,
                color,
                icon,
                userId: user._id
            })
            res.status(200).send(newCategory)

        } 
        catch (error) 
        {
            console.log("Error in adding new list data: ", error);
            next(error)
        }
    }

    static async getCategory(req, res, next)
    {
        try 
        {
           const category = await categoryModel.find()
           res.status(200).send(category)

        } 
        catch (error) 
        {
            console.log("Error in fetching list data: ", error);
            next(error)
        }
    }

    // Todo: Edit List
    static async editCategory(req, res, next)
    {
        try 
        {
           
        } 
        catch (error) 
        {
            console.log("Error in adding new list data: ", error);
            next(error)
        }
    }

    static async deleteCategory(req, res, next)
    {
        const {id} = req.params
        try 
        {
           const deleteCategory = await categoryModel.findByIdAndDelete(id)

           const deleteCategoryNotes = await todoModel.deleteMany({categoryId: id})

        res.send({deleteCategory, deleteCategoryNotes})
        } 
        catch (error) 
        {
            console.log("Error in adding new list data: ", error);
            next(error)
        }
    }
}

export default Category