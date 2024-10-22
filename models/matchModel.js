import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    teamA: { type: String, required: true },  // First team
    teamB: { type: String, required: true },  // Second team
    matchDate: { type: Date, required: true }, // Date and time of the match
    location: { type: String, required: true }, // Venue of the match
    sports: { type: String, required: true, enum: ["Cricket", "Football", "Tennis"] }, // Type of sport
    status: { type: String, enum: ["Available", "Not Available"], default: "Available" } // Status of the match
});

// Middleware to set status based on match date
matchSchema.pre('save', function (next) {
    if (this.matchDate < Date.now()) {
        this.status = "Not Available";
    }
    next();
});

export const Match = mongoose.model('Match', matchSchema);
