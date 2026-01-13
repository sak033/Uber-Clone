const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log("JWT SECRET (model):", process.env.JWT_SECRET);


const userSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long'],

        },
        lastname:{
        type:String,
        minlength:[3,'Last name must be at least 3 characters long'],
    }
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be at least 5 characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false, // do not return password field in any query by default
    },
    socketId:{
        type:String,

    },
}

);

//methods on userSchema

//1. generate JWT token
userSchema.methods.generateJwtToken = function(){
    const token=jwt.sign({
        _id:this._id,

    },process.env.JWT_SECRET);
    return token;
}

userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({
        _id:this._id,
        email:this.email
    },process.env.JWT_SECRET,{
        expiresIn:'24h'
    });
    return token;
}

//2. compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//3.static method to hash password
userSchema.statics.hashPassword = async function(password){
    return  await bcrypt.hash(password,10);
}

//user model
const userModel = mongoose.model('User',userSchema);

module.exports = userModel; 