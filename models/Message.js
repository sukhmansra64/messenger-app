//import mongoose
const mongoose = require('mongoose');

//make a schema for messages to be used by mongoose
const messageSchema = new mongoose.Schema({
    chatroom:{
        type: mongoose.Schema.Types.ObjectId,
        required: 'Chatroom is required.',
        ref:"Chatroom"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: 'User is required.',
        ref:"User"
    },
    message:{
        type: String,
        required: 'Message is required.'
    }
});

//export the model
module.exports=mongoose.model("Message",messageSchema);