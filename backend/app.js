const express = require ("express");
const app = express();
const mongoose = require('mongoose');
const Stock = require("./models/Stock");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/zerodha');
  console.log("DB connected");
}

app.get("/",(req,res)=>{
    res.send("hello zerodha");
})

app.get("/stocks",async(req,res)=>{
    try {
    const stocks = await Stock.find();
    res.json(stocks);                   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

app.listen(3000,()=>{
    console.log("app is listening to the port 3000");
})