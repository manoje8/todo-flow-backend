import { model, Schema } from "mongoose";

const categorySchema = new Schema(
    {
        listName: { type: String, required: true },
        color: { type: String },
        icon: {type: String},
        userId: {type: Schema.Types.ObjectId, ref: 'users', required: true}
    },
    {
        timestamps: true,
        collection: 'categories',
        versionKey: false
    }
)

const categoryModel = model("categories", categorySchema)

export default categoryModel