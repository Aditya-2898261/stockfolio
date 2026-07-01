require('dotenv').config();
const express = require ("express");
const cors = require("cors");
const app = express();
//database Related
const mongoose = require('mongoose');
const Stock = require("./models/stock.js");
const User = require("./models/user.js");
//session and passport
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
//Router Routes
const userRouter = require("./routes/user.js");
const stockRouter = require("./routes/stock.js");


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
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
     sameSite: false,
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

//user Routes
app.use("/users",userRouter);
//stock Routes
app.use("/stocks",stockRouter);

app.listen(process.env.PORT, ()=>{
    console.log("app is listening to the port "+ process.env.PORT);
})