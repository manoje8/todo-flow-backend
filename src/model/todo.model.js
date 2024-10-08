import { model, Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: {type: String, required: true},
        note: {type: String },
        date: {type: Date},
        location: {type: String},
        status: { type: Boolean, default:false},
        userId: {type: Schema.Types.ObjectId, ref: "users"},
        categoryId: { type: Schema.Types.ObjectId, ref: "Categories", required: true }
    },
    {
        timestamps: true
    },
    {
        collection: "todos",
        versionKey: false
    }

)

const todoModel = model("todos", todoSchema);

export default todoModel