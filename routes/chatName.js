const router = require('express').Router();
const chatName = require('../controllers/chatNameController');

router.post('/',chatName.chatName);

module.exports = router;