//import the jwt token library
const jwt = require('jwt-then');

//make a function which checks if the user has been authenticated yet before accessing the chatrooms
module.exports = async (req,res, next)=>{
    try{
        if(!req.headers.authorization) throw "You need to log in first."
        const token = req.headers.authorization;

        const payload = await jwt.verify(token, process.env.SECRET);

        req.payload = payload;

        next();
    }catch (err){
        res.json({
            message: 'You need to log in first.'
        })
    }
}
