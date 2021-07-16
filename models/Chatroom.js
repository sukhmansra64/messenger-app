//import mongoose
const mongoose = require('mongoose');

//create a new schema to be used by mongoose for chatrooms
const chatroomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Name is required.'
    }
});

//export the model
module.exports=mongoose.model("Chatroom",chatroomSchema);