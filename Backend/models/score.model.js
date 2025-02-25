const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0
    },
    minutes: {
        type: Number,
        required: true,
        min: 0,
        max: 9
    },
    seconds: {
        type: Number,
        required: true,
        min: 0,
        max: 59
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;