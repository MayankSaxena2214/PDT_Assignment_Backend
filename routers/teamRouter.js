import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { createTeam, getMyTeams, getTeam } from "../controllers/teamController.js";

export const teamRouter=express.Router();

teamRouter.post("/create",isAuthenticated,createTeam);
teamRouter.get("/get/:id",isAuthenticated,getTeam);
teamRouter.get("/getMyTeams",isAuthenticated,getMyTeams);