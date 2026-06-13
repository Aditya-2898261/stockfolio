import { useState } from "react";
import {useEffect} from "react";
 
function Portfolio(){
    let [profile,setProfile] = useState([]);

    useEffect(()=>{
        const getProfile = async() =>{
            let result = await fetch("http://localhost:3000/stocks/portfolio",{
                credentials: "include"
            });
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
                </div>
            ))
        }
       </div>
    )
}

export default Portfolio