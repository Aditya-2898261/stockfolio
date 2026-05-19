const express = require ("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

//Post route for user signup
router.post("/signup",async(req,res) => {
    let {username,email,password,balance} = req.body;
    let newUser = new User({username,email,balance});
    let registerdUser = await User.register(newUser,password);
    console.log(registerdUser);
    res.send("user signedup successfully");
});

//Post route for user login
router.post("/login",
     passport.authenticate('local', { failureRedirect: '/login'}),
     async(req,res) =>{
    res.send("user loggedin succesfully");
});

module.exports = router;