import { useEffect } from "react";
import { useState } from "react"


function StockList() {
  const [stocks,setStocks] = useState([]);
   const [quantities,setQuantities] = useState({});

   let handleQualityChange = (stockId,value) => {
    setQuantities(curr => (
      {...curr,[stockId]:value}
    ))
   }

   let handleBuy = async(stockId) => {
    let quantity = quantities[stockId];
    let result = await fetch("http://localhost:3000/stocks/buy",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      credentials:"include",
      body: JSON.stringify({ stockId, quantity })
    });
     let data = await result.text();
     alert(data);
   }
  
  useEffect(()=>{
    const getStocks = async()=>{
      let res = await fetch("http://localhost:3000/stocks");
      let data = await res.json();
      setStocks(data);
    };
    getStocks();
    },[]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stockfolio</h2>
      {stocks.map((s) =>(
        <div  key={s._id} className="flex items-center gap-4 p-3 border-b">
          <span className="w-32">{s.name}</span>
          <span className="w-24 text-gray-500">{s.symbol}</span>
          <span className="w-24">₹{s.price}</span>
          <input type="number" 
                 placeholder="enter quantity" 
                 value={quantities[s._id] || ""} 
                 onChange={(e) => handleQualityChange(s._id, e.target.value)}
                 className="border rounded px-2 py-1 w-20"
                 />
          <button 
                 onClick={() => handleBuy(s._id)}
                 className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                 >
                 Buy
          </button>
        </div>
      ))}
    </div>
  )
}

export default StockList