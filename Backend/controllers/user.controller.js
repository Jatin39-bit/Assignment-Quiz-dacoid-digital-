const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');
const scoreModel = require('../models/score.model.js');
const questionModel = require('../models/questions.model.js');
const userService= require('../services/user.service.js');

module.exports.register = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;
        const user = await userModel.create({
            name,
            email,
            password: await userModel.hashPassword(password)
        });
        const token = user.generateToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'User registered successfully',token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!await user.comparePassword(password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = user.generateToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'User logged in successfully',token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getQuestions = async (req, res) => {
    try{
        const questions = await questionModel.find();
        res.status(200).json(questions);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports.getMyScoreboard = async (req, res) => {
    try{
        const user = req.user;
        const scoreboard = await scoreModel.find({user: user._id}).sort({date: -1});
        res.status(200).json(scoreboard);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports.getLeaderboard = async (req, res) => {
    try{
        const data = await scoreModel.find({}).sort({ score: -1,date: -1}).populate('user').limit(12);
        res.status(200).json(data);
    }catch(error){
        return error;
    }
}

module.exports.saveScore = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = req.user;
        const { score, minutes, seconds } = req.body;
        const newScore =  new scoreModel({
            user: user._id,
            score,
            minutes:9-minutes,
            seconds:59-seconds
        });
        await newScore.save();
        const percentage = await userService.calculatePercentage(score, minutes, seconds);
        res.status(201).json({ message: 'Score saved successfully', percentage, newScore });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

