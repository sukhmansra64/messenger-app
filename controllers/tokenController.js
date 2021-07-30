const mongoose = require('mongoose');
const User = require('../models/User');

exports.checkToken = async (req,res)=>{
    try{
        const {token} = req.body;
        const user = await User.findOne({_id: token});
        if (!user) throw 'error, you moron';
        res.json(user.name);
    }catch (err){
        console.error(err.message);
    }

}