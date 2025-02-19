const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Question = mongoose.model('questions', QuestionSchema);
module.exports = Question;