const express = require ("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { isLoggedIn,validateSignup } = require("../middleware.js");


//Post route for user signup
router.post("/signup", validateSignup, async(req,res,next) => {
  try {
    let {username, email, password, balance} = req.body;
    let newUser = new User({username, email, balance});
    let registeredUser = await User.register(newUser, password);
    
    req.logIn(registeredUser, (err) => {
      if(err) return next(err);
      res.send("user signed up successfully");
    });
  } catch(err) {
    next(err);
  }
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

//get route to show user balance
router.get("/me", isLoggedIn,(req,res) =>{
    res.json({balance:req.user.balance, email:req.user.email});  
});

module.exports = router;