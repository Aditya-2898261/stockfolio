const User = require("../models/user.js");
const passport = require("passport");

module.exports.signup = async(req,res,next) => {
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
}

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) return next(err);
    if(!user) return res.status(401).send("Invalid username or password");
    req.logIn(user, (err) => {
      if(err) return next(err);
      res.send("logged in successfully");
    });
  })(req, res, next);
}

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
        return next(err);
        }
        res.send("user logged out");
    })
}

module.exports.showBalance = (req,res) =>{
    res.json({balance:req.user.balance, email:req.user.email});  
}