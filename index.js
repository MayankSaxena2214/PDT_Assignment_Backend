import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middlewares/error.js";
import { dbConnection } from "./database/dbConnection.js";
import { userRouter } from "./routers/userRouter.js";
import { playerRouter } from "./routers/playerRouter.js";
import { teamRouter } from "./routers/teamRouter.js";
import { matchRouter } from "./routers/matchRouter.js";



const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
dotenv.config();
dbConnection();

app.use("/api/v1/users",userRouter)
app.use("/api/v1/players",playerRouter);
app.use("/api/v1/teams",teamRouter)
app.use("/api/v1/match",matchRouter)

app.use(ErrorMiddleware);
app.listen(process.env.PORT,()=>{
    console.log(`App is listening on the port ${process.env.PORT}`);
})