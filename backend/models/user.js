const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  balance:{
    type:Number,
    required:true,
  } 
});

userSchema.plugin(passportLocalMongoose);

userSchema.pre("deleteOne",{document:true},async function(){
  const Holding = require("./holding.js");
  await Holding.deleteMany({user: this._id});
});

const User = mongoose.model('User', userSchema);

module.exports = User;

