const router = require('express').Router();
const chatName = require('../controllers/chatNameController');

//post route to use the chatname controller
router.post('/',chatName.chatName);

module.exports = router;