
import { User } from "../models/userModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { ErrorHandler } from "./error.js";
import jwt from "jsonwebtoken"

export const isAuthenticated=catchAsyncError(async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return next(new ErrorHandler("User not authenticated",400));
    }
    const decodedToken=await jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decodedToken){
        return next(new ErrorHandler("Invalid token",400));
    }
    const user=await User.findById(decodedToken.id);
    req.user=user;
    next();
})
export const isAdmin=catchAsyncError(async(req,res,next)=>{
    if(req.user.isAdmin){
        return next();
    }
    return next(new ErrorHandler("Only admin can access this",400));
})