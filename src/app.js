import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import Mongo from "./config/dbConfig.js";
import router from "./routes/routes.js";

dotenv.config()

Mongo.connect()

const app = express()

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin:process.env.CLIENT_URI,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));

app.use("/", router)

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port: ${port}`))