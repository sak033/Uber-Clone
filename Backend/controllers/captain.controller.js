const captainModel=require('../models/captain.model');
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');  

const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain=async (req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){  
        return res.status(400).json({errors:errors.array()});
    
    }

    const {fullname,email,password,vehicle}=req.body;
    
    const isCaptainExists=await captainModel.findOne({email});
    if(isCaptainExists){
        return res.status(400).json({
            success:false,
            message:'Captain with this email already exists',
        });
    }

    const hashPassword=await captainModel.hashPassword(password);

    const captain=await captainService.createCaptain({
        fullname: {
            firstname: fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password: hashPassword,
        vehicle:{
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,
        }
    });

    const token=captain.generateJwtToken();
    res.status(201).json({
        success:true,
        message:'Captain registered successfully',  
        token,
        data:{
            captain,
        }
    });

}


module.exports.loginCaptain=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){  
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;
    const captain=await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(400).json({
            success:false,
            message:'invalid email or password',
        });
    }

    const isPasswordValid=await captain.comparePassword(password);

    if(!isPasswordValid){
        return res.status(400).json({
            success:false,
            message:'invalid email or password',
        });
    }
    const token=captain.generateJwtToken();
    res.cookie('token', token);
    res.status(200).json({
        success:true,
        message:'Captain logged in successfully',  
        token,
        data:{
            captain,
        }
    });
}


module.exports.getCaptainProfile=async (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:{  
            captain:req.captain,
        }
    });
}

module.exports.logoutCaptain=async (req,res,next)=>
    {
        const token =
        req.cookies?.token ||
        (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : null);

        await blacklistTokenModel.create({token:token}); 


        res.clearCookie('token');

        res.status(200).json({
            success:true,
            message:'Captain logged out successfully',
        });
    }