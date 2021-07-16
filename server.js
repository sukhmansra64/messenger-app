require('dotenv').config();
const app = require("./app");
const port = require('./app')
 const mongoose = require("mongoose");

 mongoose.connect(process.env.DATABASE, {
     useNewUrlParser:true,
     useUnifiedTopology:true
 });

mongoose.connection.on("error",(err)=>{
    console.log(`Mongoose connection error: ${err}`)
});

mongoose.connection.once("open", ()=>{
    console.log("MongoDB is connected.")
});

require('./models/User');
require('./models/Chatroom');
require('./models/Message');

 app.listen(3000, ()=>{
     console.log(`Listening on port ${3000}`)
 })