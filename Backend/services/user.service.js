const scoreModel = require('../models/score.model');

module.exports.calculatePercentage= async (scoree,minutes,seconds)=>{
    try{
        const data = await scoreModel.find({})
        const totalScores=data.length;
        let count=0
        data.forEach((score)=>{
            if(score.score<scoree){
                count++;
            }
        })
        const percentage=(count/totalScores)*100
        return percentage;
    }catch(error){
        return error;
    }
}