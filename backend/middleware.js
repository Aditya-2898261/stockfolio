const {signupSchema} = require("./utils/schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        return res.status(401).send("You must be logged in");
    }
    next();
}

module.exports.validateSignup = (req,res,next) => {
    const {error} = signupSchema.validate(req.body);
    if(error){
       return next(new ExpressError(400, error.details[0].message));
    }
    next();
}