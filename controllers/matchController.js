import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { Match } from "../models/matchModel.js";

export const postMatch=catchAsyncError(async(req,res,next)=>{
    const {teamA,teamB,matchDate,location,sports}=req.body;
    if(req.user.isAdmin===false){
        return next(new ErrorHandler("Only admin can access this",400));
    }
    if(!teamA || !teamB || !matchDate || !location || !sports){
        return next(new ErrorHandler("Missing details",400));
    }
    const match=await Match.create({
        teamA,
        teamB,
        matchDate,
        location,
        sports,
    });
    return res.status(200).json({
        success:true,
        message:"Message created successfully",
        match
    })
});
export const getAllMatches=catchAsyncError(async(req,res,next)=>{
    const matches=await Match.find({status:"Available"});
    return res.status(200).json({
        success:true,
        matches
    })
})