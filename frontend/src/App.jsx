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
      <ul>
        {stocks.map((s) =>(
          <li key={s._id}>{s.name}</li>
        )
        )}
      </ul>
    </div>
  )
}

export default App
