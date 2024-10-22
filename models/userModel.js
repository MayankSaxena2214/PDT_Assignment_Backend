import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    isAdmin:{type:Boolean,default:false},
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]  // Reference to teams created by the user
});

export const User = mongoose.model('User', userSchema);
