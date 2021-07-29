const router = require('express').Router();
const tokenController = require('../controllers/tokenController');

router.post('/',tokenController.checkToken);

module.exports = router;