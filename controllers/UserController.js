//import mongoose, sha256, and jwt
const mongoose = require('mongoose');
const User = require('../models/User')
const sha256 = require('js-sha256');
const jwt = require('jwt-then')

//takes a name, email, and password as a request
//checks if the email is valid and has been used before
//adds request information to database by making a model for the user
exports.register = async (req, res)=>{
    const {name, email, password} = req.body;

    const emailRegex = /@gmail.com|@yahoo.com|@live.com|@outlook.com|@hotmail.com/

    if(!emailRegex.test(email)) throw "Email either isn't supported, or is entered incorrectly."
    if(password.length<6) throw "Password must be at least 6 characters long."

    const userExists = await User.findOne({
        email,
    })

    if(userExists) throw "A user with this email has already been registered."

    const user = new User({name, email, password: sha256(password + process.env.SALT)})

    await user.save();

    res.json({
        message: `User ${name} registered successfully.`
    });
}

//checks if account exist
//logs user in
exports.login = async (req, res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email,
        password: sha256(password + process.env.SALT)
    });
    if (!user) throw "Email or Password is incorrect.";

    const token = await jwt.sign({user: user._id}, process.env.SECRET);

    res.json({
        message: `${user.name} has been logged in successfully.`,
        token,
    });

};