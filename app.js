//import express
const express = require('express')
//make the server using express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//import routes
app.use("/user",require('./routes/User'))
app.use("/chatroom",require('./routes/Chatroom'));

//error handlers to help error testing
const errorHandlers = require('./handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if(process.env.ENV==="DEVELOPMENT"){
    app.use(errorHandlers.developmentErrors);
}else{
    app.use(errorHandlers.productionErrors);
}

//export the server
module.exports = app;