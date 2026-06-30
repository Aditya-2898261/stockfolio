import { useEffect } from "react";
import { useState } from "react"


function StockList() {
  const [stocks,setStocks] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [selectedStock,setSelectedStock] = useState(null);
  const [modalQty, setModalQty] = useState("");

  const handleBuyClick = (stock) => {
   setSelectedStock(stock);
   setShowModal(true);
  }

  const handleQuantity = (value) => {
    setModalQty(value);
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedStock(null);
    setModalQty("");
  }

   let handleBuy = async() => {
    let result = await fetch("http://localhost:3000/stocks/buy",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      credentials:"include",
      body: JSON.stringify({ stockId: selectedStock._id, quantity: Number(modalQty) })
    });
     let data = await result.text();
     alert(data);
     closeModal();
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

{showModal && selectedStock && (
  <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-1">Buy Stock</h3>
      <p className="text-gray-500 text-sm mb-6">{selectedStock.name}</p>
      
      <div className="flex justify-between mb-6">
        <span className="text-gray-600">Price</span>
        <span className="font-semibold">₹{selectedStock.price}</span>
      </div>

      <input 
        type="number" 
        placeholder="Enter quantity" 
        value={modalQty} 
        onChange={(e) => handleQuantity(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <div className="flex gap-3">
        <button onClick={closeModal} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
        <button onClick={handleBuy} className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Confirm Buy</button>
      </div>
    </div>
  </div>
)}

    <h2 className="text-2xl font-bold text-gray-900 mb-6">Watchlist</h2>
    
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="grid grid-cols-5 gap-4 px-4 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200">
        <span className="col-span-2">INSTRUMENT</span>
        <span>LTP</span>
        <span>QTY</span>
      </div>
      
      {stocks.map((s, index) => (
      <div key={s._id} className={`grid grid-cols-5 gap-4 px-4 py-3 items-center hover:bg-gray-50 ${index !== stocks.length - 1 ? 'border-b border-gray-100' : ''}`}>
          <div className="col-span-2">
            <p className="font-semibold text-gray-900 text-sm">{s.symbol}</p>
            <p className="text-xs text-gray-400">{s.name}</p>
          </div>
            <span className="font-mono font-semibold text-gray-900">₹{s.price}</span>
            <button onClick={() => handleBuyClick(s)}
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