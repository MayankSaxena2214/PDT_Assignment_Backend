import express from "express"
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { addPlayer, getAllPlayers, getPlayerByTeam } from "../controllers/playerController.js";

export const playerRouter=express.Router();

playerRouter.post("/add",isAuthenticated,isAdmin,addPlayer);
playerRouter.get("/getAll",getAllPlayers);
playerRouter.get("/getByTeam",getPlayerByTeam);
