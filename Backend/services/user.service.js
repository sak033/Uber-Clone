const userModel = require('../models/user.model');

//check if user exists and create user if not
module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if (!firstname || !email || !password) {
        throw new Error('Required fields are missing');
    }

    const user=userModel.create({
        fullname:{firstname,lastname},
        email,
        password,   
    })

    return user;
}