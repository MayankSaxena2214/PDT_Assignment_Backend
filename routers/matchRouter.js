import express from "express";
import { getAllMatches, postMatch } from "../controllers/matchController.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const matchRouter=express.Router();

matchRouter.post("/addMatch",isAuthenticated,postMatch);
matchRouter.get("/getMatches",getAllMatches);