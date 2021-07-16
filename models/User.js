//import mongoose
const mongoose = require('mongoose');

//create a schema for the user to use with mongoose
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Name is required.'
    },
    email:{
        type: String,
        required: 'Email is required.'
    },
    password:{
        type: String,
        required: 'Password is required.'
    },
}, {timestamps: true})

//export the model
module.exports=mongoose.model("User",userSchema);