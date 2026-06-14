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
       <div>
        {
            profile.map((holds) =>(
                <div key={holds._id}>
                    <span>{holds.stock.name}</span>&nbsp;&nbsp;
                    <span>{holds.stock.symbol}</span>&nbsp;&nbsp;
                    <span>{holds.stock.price}</span>&nbsp;&nbsp;
                     <span>{holds.quantity}</span>&nbsp;&nbsp;
                    <span>Total:{holds.quantity*holds.stock.price}</span>&nbsp;&nbsp;  
                    <input type="number" placeholder="enter sell quantity" value={sellQuantity[holds.stock._id] || ""} onChange={(e) => handleSellQuantity(holds.stock._id, e.target.value)} />
                    <button onClick={() => handleSell(holds.stock._id)}>Sell</button>
                </div>
            ))
        }
       </div>
    )
}

export default Portfolio