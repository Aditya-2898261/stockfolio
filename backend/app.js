const express = require ("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const Stock = require("./models/stock.js");
const User = require("./models/user.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userRouter = require("./routes/user.js");
const stockRouter = require("./routes/stock.js");

app.use(cors());
app.use(express.json());

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/zerodha');
  console.log("DB connected");
}

const sessionOptions = {
  secret: 'Mystocksecreat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly: true,
  }
}

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res)=>{
    res.send("hello zerodha");
})

app.use("/users",userRouter);

app.use("/stocks",stockRouter);

app.listen(3000,()=>{
    console.log("app is listening to the port 3000");
})