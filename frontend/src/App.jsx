import { useEffect } from "react";
import { useState } from "react"


function App() {
  const [stocks,setStocks] = useState([]);
  
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
        </div>
      ))}
    </div>
  )
}

export default App
