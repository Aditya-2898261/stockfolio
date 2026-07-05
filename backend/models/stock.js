const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: String,
  symbol:String,
  price:Number,
  prevPrice:Number,
});

stockSchema.pre("deleteOne",{document:true},async function(){
  const Holding = require("./holding.js");
  await Holding.deleteMany({stock: this._id});
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;