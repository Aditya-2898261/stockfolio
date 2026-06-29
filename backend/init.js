
const mongoose = require('mongoose');
const Stock = require("./models/Stock");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/zerodha');
  console.log("z db connected");


let fakedata = [
  { name: "Tata Motors", symbol: "TATAMOTORS", price: 456 },
  { name: "Zudio", symbol: "ZUDIO", price: 346 },
  { name: "Deloitte", symbol: "DOT", price: 873 },
  { name: "Reliance Industries", symbol: "RELIANCE", price: 2956 },
  { name: "Infosys", symbol: "INFY", price: 1823 },
  { name: "HDFC Bank", symbol: "HDFCBANK", price: 1678 },
  { name: "TCS", symbol: "TCS", price: 3945 },
  { name: "Wipro", symbol: "WIPRO", price: 456 },
  { name: "Adani Ports", symbol: "ADANIPORTS", price: 1234 },
  { name: "Bajaj Finance", symbol: "BAJFINANCE", price: 7823 },
  { name: "Asian Paints", symbol: "ASIANPAINT", price: 2876 },
  { name: "Maruti Suzuki", symbol: "MARUTI", price: 10234 },
  { name: "Sun Pharma", symbol: "SUNPHARMA", price: 1456 },
  { name: "ITC Limited", symbol: "ITC", price: 478 },
  { name: "Larsen & Toubro", symbol: "LT", price: 3567 },
];

await Stock.insertMany(fakedata);
console.log("data inserted");
}