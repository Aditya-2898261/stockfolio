const Stock = require("../models/stock.js");
const Holding = require("../models/holding.js");

module.exports.showStocks = async(req,res)=>{
    const stocks = await Stock.find();
    res.json(stocks);                   
}

module.exports.buyStocks = async(req,res)=>{
    let{stockId,quantity} = req.body;
    if(!quantity || quantity <= 0){
    return res.status(400).send("Invalid quantity");
    }
    const stock = await Stock.findById(stockId);
    let totalPrice = stock.price*quantity;
    const user = req.user;

    if(user.balance < totalPrice){
       return res.status(401).send("you don have suffiecient balance");
    }

    user.balance = user.balance-totalPrice;
    await user.save();
   //check if holding alreday exist with stock and user
    let existingHolding = await Holding.findOne({user:user._id,stock:stockId});
 
    if(existingHolding){
       existingHolding.quantity+= Number(quantity);
       await existingHolding.save(); 
    }else{
        let newHolding = new Holding({
        user:user,
        stock:stock,
        quantity:Number(quantity),
        })
       await newHolding.save();
    }
    res.send("stock bought successfully");
}

module.exports.portfolio = async(req,res) =>{
   let allHoldings = await Holding.find({user:req.user._id}).populate("stock");
   res.send(allHoldings);
}

module.exports.sellStock = async(req,res) =>{
    let {stockId,quantity} = req.body;
    if(!quantity || quantity <= 0){
    return res.status(400).send("Invalid quantity");
    }
    let holding = await Holding.findOne({user:req.user._id, stock:stockId}).populate("stock");
    if(!holding){
    return res.status(404).send("Holding not found");
    }
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
}