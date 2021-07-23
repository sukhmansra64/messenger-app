//import a router, error catching function, and the controller for each path
const router = require('express').Router();
const {catchErrors} = require('../handlers/errorHandlers');
const chatroomController = require("../controllers/ChatroomController");

//import the authentication function
const auth = require("../middlewares/auth");

//post the route to the chatroom and all chatrooms
router.get("/", auth, catchErrors(chatroomController.getAllChatrooms));
router.post('/',auth,catchErrors(chatroomController.createChatroom));

module.exports = router;