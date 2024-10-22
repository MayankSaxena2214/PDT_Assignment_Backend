import express from "express";
import { getMyTeams, getUser, login, register, updatePassword } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";


export const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/getUser",isAuthenticated,getUser);
userRouter.patch("/updatePassword",updatePassword);
userRouter.get("/myteams",isAuthenticated,getMyTeams);