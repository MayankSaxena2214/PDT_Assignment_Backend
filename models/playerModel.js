import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },  // Real-life team or category
    position: { type: String, required: true },  // e.g., 'Batsman', 'Bowler', etc.
    points: { type: Number, default: 0 },
    avatar:{
        url:{
            type:String,
            default:"https://t.ly/L_EUf",
        },
        public_id:{
            type:String,
            default:`${uuidv4()}`
        }
    },
    sports: { type: String, required: true,enum:["Cricket","Football","Tennis"] }  // e.g., 'Cricket', 'Football', etc.
});

export const Player = mongoose.model('Player', playerSchema);

