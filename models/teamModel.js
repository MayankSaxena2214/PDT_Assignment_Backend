import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the fantasy team
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],  // Array of player IDs
    totalPoints: { type: Number, default: 0 },  // Sum of all players' points
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    match:{type:mongoose.Schema.Types.ObjectId,ref:"Match"},
    
});

export const Team = mongoose.model('Team', teamSchema);
