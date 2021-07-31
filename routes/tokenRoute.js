const router = require('express').Router();
const tokenController = require('../controllers/tokenController');

//post route to use the token controller
router.post('/',tokenController.checkToken);

module.exports = router;