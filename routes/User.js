//import a router, error catching function, and the controller for each path
const router = require("express").Router();
const {catchErrors} = require("../handlers/errorHandlers");
const userController = require("../controllers/UserController")

//runs the function for the respective url path
router.post("/login",catchErrors(userController.login));
router.post("/register",catchErrors(userController.register));

//export router
module.exports = router;