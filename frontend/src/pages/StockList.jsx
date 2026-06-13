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
    <div>
      <h2>Stockfolio</h2>
      {stocks.map((s) =>(
        <div  key={s._id}>
          <span>Company:{s.name}</span>
          <span>Symbol:{s.symbol}</span>
          <span>Price:{s.price}</span>
          <input type="number" placeholder="enter quantity" value={quantities[s._id] || ""} onChange={(e) => handleQualityChange(s._id, e.target.value)}/>
          <button onClick={() => handleBuy(s._id)}>Buy</button>
        </div>
      ))}
    </div>
  )
}

export default StockList