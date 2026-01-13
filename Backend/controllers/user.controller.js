const userModel= require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator'); 
const blacklistTokenModel= require('../models/blacklistToken.model')


//register user-API


module.exports.registerUser=async (req,res,next)=>{
  //logic to create user
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }


    const {fullname,email,password}=req.body;

    const hashPassword=await userModel.hashPassword(password);

    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
    });

    const token=user.generateJwtToken();

    res.status(201).json({
        success:true,
        message:'User registered successfully',
        data:{
            user,
            token,
        }
    });
}

module.exports.loginUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password');

    if(!user){
        return  res.status(401).json({
            success:false,
            message:'Invalid email or password',
        });
    }

    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return  res.status(401).json({
            success:false,
            message:'Invalid email or password',
        });
    }

    const token=user.generateJwtToken();
     
    res.cookie('token',token);

    res.status(200).json({
        success:true,
        message:'User logged in successfully',
        data:{
            user,
            token,
        }
    });

}

module.exports.getUserProfile=async (req,res,next)=>{
    res.status(200).json({
        success:true,
        message:'User profile fetched successfully',
        data:{
            user:req.user,
        }
    });
}

module.exports.logoutUser=async (req,res,next)=>{
    res.clearCookie('token');
     
   const token =req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:'Logged out'})
}