//import dotenv to be used in this program
require('dotenv').config();
//import the server and create the port number
const app = require("./app");
const portNum = 3000
//import mongoose to use MongoDB
 const mongoose = require("mongoose");

//connect to mongoDB
 mongoose.connect(process.env.DATABASE, {
     useNewUrlParser:true,
     useUnifiedTopology:true
 });

//for error testing
mongoose.connection.on("error",(err)=>{
    console.log(`Mongoose connection error: ${err}`)
});

//inform user that MongoDB has been connected
mongoose.connection.once("open", ()=>{
    console.log("MongoDB is connected.")
});

//import the models to be used with Mongoose
require('./models/User');
require('./models/Chatroom');
require('./models/Message');

//listen on the port number
const server = app.listen(portNum, ()=>{
     console.log(`Listening on port ${portNum}`)
 });

const io = require('socket.io')(server);

io.use(async (socket, next)=>{
    try{
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userID = payload._id;
        next();
    }catch (err){

    }
})
io.on('Connection',(socket)=>{
    console.log('connected: '+socket.userID)
    socket.on('disconnect',()=>{
        console.log('Disconnected: '+socket.userID);
    })
})

