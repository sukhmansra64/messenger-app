//import express
const express = require('express')
//make the server using express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('cors')());

//import routes
app.use("/user",require('./routes/User'))
app.use("/chatroom",require('./routes/Chatroom'));
app.use('/checkToken',require('./routes/tokenRoute'));
app.use('/chatName', require('./routes/chatName'));

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