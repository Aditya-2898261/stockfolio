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

router.get("/portfolio",async(req,res) =>{
   let allHoldings = await Holding.find({user:req.user._id}).populate("stock");
   res.send(allHoldings);
});

router.post("/sell",async(req,res) =>{
try{
    let {stockid,quantity} = req.body;
    let holding = await Holding.findOne({user:req.user._id, stock:stockid}).populate("stock");
    if(quantity>holding.quantity){
     return res.status(401).send("quantity is greater than actual")
    }
    let total = holding.stock.price*quantity;
    req.user.balance+=total;
    await req.user.save();
    holding.quantity-=quantity;
    if(holding.quantity === 0){
        await holding.deleteOne();
    }else{
       await holding.save();
    }
    res.send("stock sold successfully");
}catch(err){
    res.status(400).send(err.message);
}
});



module.exports = router;
