const express = require ("express");
const router = express.Router();
const Stock = require("../models/stock.js");
const Holding = require("../models/holding.js")

router.get("/",async(req,res)=>{
    try {
    const stocks = await Stock.find();
    res.json(stocks);                   
    }catch(err){
    res.status(500).json({ message: err.message });
    }
});

router.post("/buy",async(req,res)=>{
    try{
    let{stockId,quantity} = req.body;
    const stock = await Stock.findById(stockId);
    let totalPrice = stock.price*quantity;
    const user = req.user;
    if(user.balance < totalPrice){
       return res.status(401).send("you don have suffiecient balance");
    }
    user.balance = user.balance-totalPrice;
    await user.save();
    let newHolding = new Holding({
        user:user,
        stock:stock,
        quantity:quantity,
    })
    await newHolding.save();
    res.send("stock bought successfully");
   }catch(err){
    res.status(500).send(err.message);
   }
});



module.exports = router;