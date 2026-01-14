const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1]
                : null);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access - No token provided',
            });
        }
         const isBlacklisted = await blacklistToken.findOne({token: token});
         if(isBlacklisted){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access - Token is blacklisted',
            });
         }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access - Invalid token',
        });
    }
};


module.exports.authCaptain = async (req, res, next) => {

    const token =
        req.cookies?.token ||
        (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : null);

            console.log("Auth Captain Token:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized  access ',
        });

    }

    const isBlacklisted = await blacklistToken.findOne({token: token});

    console.log("Is Blacklisted:", isBlacklisted);
    if(isBlacklisted){
       return res.status(401).json({
           success: false,
           message: 'Unauthorized access',
       });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next();
    } catch (error) {

        console.log("Error in authCaptain:", error);    
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access - Invalid token',
        });
    } 
}