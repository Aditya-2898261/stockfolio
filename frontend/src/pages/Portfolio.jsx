import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

 
function Portfolio(){
    const navigate = useNavigate();
    let [profile,setProfile] = useState([]);
    const [showSellModal,setShowSellModal] = useState(false);
    const [selectedSellStock,setSelectedSellStock] = useState(null);
    const [modalSellQty,setModalSellQty] = useState("");

    const handleSellClick = (stock) => {
      setShowSellModal(true);
      setSelectedSellStock(stock);
    }

    const handleSellQuantity = (value) => {
        setModalSellQty(value);
    }

    const closeModal = () => {
    setShowSellModal(false);
    setSelectedSellStock(null);
    setModalSellQty("");
    }

     let handleSell = async() =>{
        let result = await fetch("https://stockfolio-backend-jkpl.onrender.com/stocks/sell",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            credentials: "include",
            body: JSON.stringify({ stockId:selectedSellStock._id, quantity: Number(modalSellQty) })
        })
        let data = await result.text();
        alert(data);
        if(result.ok){
            closeModal();
            window.location.reload();
        }
     }

    useEffect(()=>{
        const getProfile = async() =>{
            let result = await fetch("https://stockfolio-backend-jkpl.onrender.com/stocks/portfolio",{
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
        {showSellModal && selectedSellStock && (
          <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Sell Stock</h3>
              <p className="text-gray-500 text-sm mb-6">{selectedSellStock.name}</p>
              
              <div className="flex justify-between mb-6">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold">₹{selectedSellStock.price}</span>
              </div>

              <input 
                type="number" 
                placeholder="Enter quantity" 
                value={modalSellQty} 
                onChange={(e) => handleSellQuantity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <div className="flex gap-3">
                <button onClick={closeModal} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleSell} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">Confirm Sell</button>
              </div>
            </div>
          </div>
        )}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Holdings</h2>
    
     <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="grid grid-cols-6 gap-4 px-4 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200">
        <span className="col-span-2">INSTRUMENT</span>
        <span>QTY</span>
        <span>LTP</span>
        <span>CURRENT VALUE</span>
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
            <button 
             onClick={() => handleSellClick(holds.stock)}
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