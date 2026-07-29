import express from "express";
import {connectDB} from "./config/database.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { requestRouter } from "./routes/requests.js";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3333;
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}));

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB().then(()=>{
    console.log("Connected to database.");
    app.listen(PORT,()=>{
    console.log("App is listening at " + PORT + " post successfully...");
    });
}).catch(err=>{
    console.error("Database connection error:", err.message);
    process.exit(1);
});
