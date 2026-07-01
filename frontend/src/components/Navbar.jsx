import { useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Navbar(){

  let [user,setUser] = useState(null);

  useEffect(() => {
    const getUser = async() => {
      let result = await fetch("http://localhost:3000/users/me", {
       credentials:"include"
      });
      if(result.ok){
        let data = await result.json();
        setUser(data);
      }
    }
     getUser(); 
  },[]);

let handleLogout = async() => {
  let result = await fetch("http://localhost:3000/users/logout",{
    credentials:"include"
  })
  if(result.ok){
     window.location.href = "/login";
  }
}

    return(
        <nav className="bg-gray-800 text-white px-6 py-4 flex gap-6 items-center">
            <Link to="/stocks">Stocks</Link> 
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/login">Login</Link> 
            <Link to="/signup">Signup</Link>
            {user && <span className="ml-auto">₹{user.balance}</span>}
            <button onClick={handleLogout} className={user ? "" : "ml-auto"}>Logout</button>
        </nav>
    )
}

export default Navbar