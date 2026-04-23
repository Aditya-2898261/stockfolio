
const mongoose = require('mongoose');
const Stock = require("./models/Stock");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/zerodha');
  console.log("z db connected");


let fakedata = [
    {
    name:"tata",
    symbol:"TATA",
    price:456
    },
    {
    name:"zudio",
    symbol:"ZA",
    price:346
    },
    {
    name:"deloit",
    symbol:"DOT",
    price:873
    },
];


await Stock.insertMany(fakedata);
console.log("data inserted");
}