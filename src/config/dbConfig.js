import mongoose from "mongoose"

class Mongo
{
    static async connect()
    {
        const MONGODB_URI = process.env.MONGODB_URI;
        if(!MONGODB_URI) throw Error("MongoDB URI is missing")

        await mongoose.connect(MONGODB_URI, {
            dbName: process.env.DATABASE_NAME,
            bufferCommands: "false"
        })
        .then(() => console.log("MongoDB connected successfully"))
        .catch(err => console.error(`MongoDB connection failed: ${err}`))
    }
}

export default Mongo