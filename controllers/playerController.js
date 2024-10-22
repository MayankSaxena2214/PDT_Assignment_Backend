import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { Player } from "../models/playerModel.js";

export const addPlayer=catchAsyncError(async(req,res,next)=>{
    let {name,team,position,sports}=req.body;
    if(!name || !team || !position || !sports){
        return next(new ErrorHandler("Please give all details",400));
    }
    const player=await Player.create({
        name,
        team,
        position,
        sports,
    });
    return res.status(200).json({
        success:true,
        message:"Player created successfully",
        player,
    })
});

export const getAllPlayers=catchAsyncError(async(req,res,next)=>{
    const players=await Player.find();
    return res.status(200).json({
        success:true,
        players,
    })
})

export const getPlayerByTeam=catchAsyncError(async(req,res,next)=>{
    let {team}=req.query;
    if(!team){
        return next(new ErrorHandler("Please enter the team",400));
    }
    let players = await Player.find({ team: { $regex: team, $options: 'i' } });
    return res.status(200).json({
        success:true,
        players,
        total:players?players.length:0,
    })
})