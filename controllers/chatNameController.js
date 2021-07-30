const mongoose = require('mongoose');
const Chatroom = require('../models/Chatroom');

exports.chatName = async (req,res) =>{
    try{
        const {id} = req.body;
        const chatroom = await Chatroom.findOne({_id: id});
        if (!chatroom) throw 'error, you moron!';
        res.json(chatroom.name);
    }catch(err){
        console.error(err.message);
    }
}