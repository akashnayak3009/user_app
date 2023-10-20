import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from 'cors';
import connectDb from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cors());


dotenv.config();

//connection to MONGODB database
connectDb();

//bodyParser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

//cookieParser
app.use(cookieParser());

// //Routes
app.use("/api/user", UserRouter)



//Connection To server
const port = process.env.PORT || 6000; //Alternate port
app.listen(port, () => {
    console.log(
        `Server is connected and  mode at http://localhost:${port}`.yellow.bold
    );
});