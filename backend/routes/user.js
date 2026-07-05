const express = require ("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const userController = require("../controllers/user.js");
const { isLoggedIn,validateSignup } = require("../middleware.js");


//Post route for user signup
router.post("/signup", validateSignup, userController.signup);

//Post route for user login
router.post("/login", userController.login);

//get route for logout
router.get("/logout", userController.logout);

//get route to show user balance
router.get("/me", isLoggedIn, userController.showBalance);

module.exports = router;