
const mongoose = require('mongoose');
const Stock = require("./models/Stock");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/zerodha');
  console.log("z db connected");


let fakedata = [
  { name: "Tata Motors", symbol: "TATAMOTORS", price: 456,prevPrice: 442 },
  { name: "Zudio", symbol: "ZUDIO", price: 346,prevPrice: 352 },
  { name: "Deloitte", symbol: "DOT", price: 873,prevPrice: 942 },
  { name: "Reliance Industries", symbol: "RELIANCE", price: 2956,prevPrice: 2842 },
  { name: "Infosys", symbol: "INFY", price: 1823,prevPrice: 442 },
  { name: "HDFC Bank", symbol: "HDFCBANK", price: 1678,prevPrice: 2042 },
  { name: "TCS", symbol: "TCS", price: 3945,prevPrice: 3842 },
  { name: "Wipro", symbol: "WIPRO", price: 456,prevPrice: 458 },
  { name: "Adani Ports", symbol: "ADANIPORTS", price: 1234,prevPrice: 1242},
  { name: "Bajaj Finance", symbol: "BAJFINANCE", price: 7823,prevPrice: 7442 },
  { name: "Asian Paints", symbol: "ASIANPAINT", price: 2876,prevPrice: 2942 },
  { name: "Maruti Suzuki", symbol: "MARUTI", price: 10234,prevPrice: 1442 },
  { name: "Sun Pharma", symbol: "SUNPHARMA", price: 1456,prevPrice: 1442 },
  { name: "ITC Limited", symbol: "ITC", price: 478,prevPrice: 442 },
  { name: "Larsen & Toubro", symbol: "LT", price: 3567,prevPrice: 3442 },
];

await Stock.insertMany(fakedata);
console.log("data inserted");
}