import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { Player } from "../models/playerModel.js";
import { Team } from "../models/teamModel.js";
import { User } from "../models/userModel.js";
import {v4 as uuidv4} from "uuid"

export const createTeam = catchAsyncError(async (req, res, next) => {
    let { name, players,match } = req.body;

    // Validate the request
    if(!name){
        name=`Team ${uuidv4()}`
    }
    if (!name || !players || players.length !== 11 || !match) {
        return next(new ErrorHandler("Please provide a team name and exactly 11 player IDs.", 400));
    }

    // Check if all players are valid
    // const validPlayers = await Player.find({ _id: { $in: players } });
    // if (validPlayers.length !== 11) {
    //     return next(new ErrorHandler("One or more player IDs are invalid.", 400));
    // }

    // Create the team
    const team = await Team.create({ name, players,createdBy:req.user._id ,match});

    // Update user's teams reference
    await User.findByIdAndUpdate(req.user.id, { $push: { teams: team._id } });

    return res.status(201).json({
        success: true,
        team
    });
});

export const getTeam=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    if(!id){
        return next(new ErrorHandler("Id not found",400));
    }
    const team=await Team.findById(id)
    .populate('players')
    .populate('match');
    
    return res.status(200).json({
        success:true,
        team,
    })
});
export const getMyTeams=catchAsyncError(async(req,res,next)=>{
    const teams=await Team.find();
    return res.status(200).json({
        success:true,
        teams,
    })
})