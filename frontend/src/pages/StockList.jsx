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
   
  <div className="min-h-screen bg-gray-50 p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Watchlist</h2>
    
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="grid grid-cols-5 gap-4 px-4 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200">
        <span className="col-span-2">INSTRUMENT</span>
        <span>LTP</span>
        <span>QTY</span>
        <span>ACTION</span>
      </div>
      
      {stocks.map((s, index) => (
        <div  key={s._id} className={`grid grid-cols-5 gap-4 px-4 py-3 items-center hover:bg-gray-50 ${index !== stocks.length - 1 ? 'border-b border-gray-100' : ''}`}>
          <div className="col-span-2">
            <p className="font-semibold text-gray-900 text-sm">{s.symbol}</p>
            <p className="text-xs text-gray-400">{s.name}</p>
          </div>
          <span className="font-mono font-semibold text-gray-900">₹{s.price}</span>
          <input 
            type="number" 
            placeholder="0" 
            value={quantities[s._id] || ""} 
            onChange={(e) => handleQualityChange(s._id, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={() => handleBuy(s._id)}
            className="bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-green-700 transition w-fit"
          >
            BUY
          </button>
        </div>
      ))}
    </div>
  </div>
)
  
}

export default StockList