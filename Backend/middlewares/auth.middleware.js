const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

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
         const isBlacklisted = await userModel.findOne({token: token});
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
