import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

 
function Portfolio(){
    const navigate = useNavigate();
    let [profile,setProfile] = useState([]);
     let [sellQuantity,setSellQuantity] = useState({});

     let handleSellQuantity = (stockId,value) =>{
        setSellQuantity((curr) => (
            {...curr,[stockId]:value}
        )
     )}

     let handleSell = async(stockId) =>{
        let quantity = sellQuantity[stockId];
        let result = await fetch("http://localhost:3000/stocks/sell",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
            body: JSON.stringify({ stockId, quantity })
        })
        let data = await result.text();
        alert(data);
        if(result.ok){
            window.location.reload();
        }
     }

    useEffect(()=>{
        const getProfile = async() =>{
            let result = await fetch("http://localhost:3000/stocks/portfolio",{
                credentials: "include"
            });
            if(!result.ok){
                let message = await result.text();
                alert(message);
                 navigate("/login");
                return;
            }
            let data = await result.json();
            setProfile(data);
        };
        getProfile();
    },[]);

    return(
      <div className="min-h-screen bg-gray-50 p-6">
         <h2 className="text-2xl font-bold text-gray-900 mb-6">Holdings</h2>
    
     <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="grid grid-cols-6 gap-4 px-4 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200">
        <span className="col-span-2">INSTRUMENT</span>
        <span>QTY</span>
        <span>LTP</span>
        <span>CURRENT VALUE</span>
        <span>ACTION</span>
      </div>

      {profile.map((holds, index) => (
        <div key={holds._id} className={`grid grid-cols-6 gap-4 px-4 py-3 items-center hover:bg-gray-50 ${index !== profile.length - 1 ? 'border-b border-gray-100' : ''}`}>
          <div className="col-span-2">
            <p className="font-semibold text-gray-900 text-sm">{holds.stock.symbol}</p>
            <p className="text-xs text-gray-400">{holds.stock.name}</p>
          </div>
          <span className="font-mono text-gray-900">{holds.quantity}</span>
          <span className="font-mono text-gray-900">₹{holds.stock.price}</span>
          <span className="font-mono font-semibold text-gray-900">₹{holds.quantity * holds.stock.price}</span>
          
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="0" 
              value={sellQuantity[holds.stock._id] || ""} 
              onChange={(e) => handleSellQuantity(holds.stock._id, e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-14 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button 
              onClick={() => handleSell(holds.stock._id)}
              className="bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-700 transition"
            >
              SELL
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default Portfolio