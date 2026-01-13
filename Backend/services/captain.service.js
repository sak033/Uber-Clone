const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    fullname,
    email,
    password,
    vehicle
}) => {
    // ✅ Proper validation for nested data
    if (
        !fullname?.firstname ||
        !email ||
        !password ||
        !vehicle?.color ||
        !vehicle?.plate ||
        !vehicle?.capacity ||
        !vehicle?.vehicleType
    ) {
        throw new Error('All fields are required to create a captain');
    }

    const captain = await captainModel.create({
        fullname,
        email,
        password,
        vehicle
    });

    return captain;
};
