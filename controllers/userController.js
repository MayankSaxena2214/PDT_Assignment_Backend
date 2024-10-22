import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler }from "../middlewares/error.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js";
import { Team } from "../models/teamModel.js";

export const register=catchAsyncError(async(req,res,next)=>{
    let {name,email,password}=req.body;
    if(!name || !email || !password){
        return next(new ErrorHandler("All fields are required",400));
    }
    email=email.toLowerCase();
    const checkUser=await User.findOne({email:email});
    if(checkUser){
        return next(new ErrorHandler("Email already exist, Kindly login",400));
    }
    //hash the password
    password=await bcrypt.hash(password,8);
    const user=await User.create({
        name,email,password
    })
    return res.status(200).json({
        success:true,
        message:"User registered successfully",
        user
    })
})

export const login=catchAsyncError(async(req,res,next)=>{
    let {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("All fields are required",400));
    }
    email=email.toLowerCase();
    let user=await User.findOne({email:email});
    if(!user){
        return next(new ErrorHandler("User does not exist, Kindly Register",400));
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return next(new ErrorHandler("Password does not match",400));
    }
    const token=await jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
    return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        token,
        user
    })
});

export const updatePassword=catchAsyncError(async(req,res,next)=>{
    let {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Kindly enter the new Password"));
    }
    email=email.toLowerCase();
    let user=await User.findOne({email:email});
    const oldMatch=await bcrypt.compare(password,user.password);
    if(oldMatch){
        return next(new ErrorHandler("Please enter different password from older one",400));
    }
    let newPassword=await bcrypt.hash(password,8);
    await User.updateOne({email:email},{password:newPassword});
    return res.status(200).json({
        success:true,
        message:"Password updated successfully",
    })
})
export const getUser=catchAsyncError(async(req,res,next)=>{
    return res.status(200).json({
        success:true,
        user:req.user,
    })
});

export const getMyTeams=catchAsyncError(async(req,res,next)=>{
    const teams=await Team.find({createdBy:req.user._id});
    return res.status(200).json({
        success:true,
        teams,
    })
})