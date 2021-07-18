//import mongoose and the chatroom model
const mongoose = require('mongoose');
const chatroom = require('../models/Chatroom');

//sets conditions to be able to make chatrooms along with saving the chatroom to the database
exports.createChatroom = async (req,res)=>{
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if(!nameRegex.test(name)) throw 'Please use letters only.';

    const chatroomExists = await chatroom.findOne({name});

    if (chatroomExists) throw 'A chatroom with that name already exists.';

    const aChatroom = new chatroom({
        name,
    });

    await aChatroom.save();

    res.json({
        message: 'Chatroom successfully created.'
    })
}