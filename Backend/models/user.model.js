const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select:false
    }
})

userSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password, 10)
}
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const User= mongoose.model('User', userSchema)
module.exports = User
