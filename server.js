//import dotenv to be used in this program
require('dotenv').config();
//import the server and create the port number
const app = require("./app");
const portNum = 8080
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
const jwt = require("jwt-then");
const Message = mongoose.model("Message");
const User = mongoose.model("User");

//listen on the port number
const server = app.listen(portNum, ()=>{
     console.log(`Listening on port ${portNum}`);
 });

const io = require('socket.io')(server);

io.use(async (socket, next)=>{
    try{
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userID = payload.user;
        next();
    }catch (err){
        console.log(err.message);
    }
})
io.on('connect',(socket)=>{
    console.log('connected: '+socket.userID)

    socket.on('disconnect',()=>{
        console.log('Disconnected: '+socket.userID);
    })
    socket.on("joinRoom", ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log("A user joined chatroom: " + chatroomId);
    });

    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("A user left chatroom: " + chatroomId);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
        if (message.trim().length > 0) {
            const user = await User.findOne({_id: socket.userID});
            const newMessage = new Message({
                chatroom: chatroomId,
                user: user._id,
                message,
            });
            io.to(chatroomId).emit("newMessage", {
                message,
                name: user.name,
                userId: socket.userId,
            });
            await newMessage.save();
        }
    });
});
//testing
String.prototype.toObjectId = function() {
    let ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

