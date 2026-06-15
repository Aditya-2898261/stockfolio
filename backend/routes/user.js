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
router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) return next(err);
    if(!user) return res.status(401).send("Invalid username or password");
    req.logIn(user, (err) => {
      if(err) return next(err);
      res.send("logged in successfully");
    });
  })(req, res, next);
});
// router.post("/login",
//      passport.authenticate('local', { failureRedirect: '/login'}),
//      async(req,res) =>{
//     res.send("user loggedin succesfully");
// });

//get route for logout
router.get("/logout",(req,res,next) => {
    req.logout((err) => {
        if(err){
        return next(err);
        }
        res.send("user logged out");
    })
});

module.exports = router;