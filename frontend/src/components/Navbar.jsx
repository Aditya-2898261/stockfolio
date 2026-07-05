import { useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Navbar(){

  let [user,setUser] = useState(null);

  useEffect(() => {
    const getUser = async() => {
      let result = await fetch("https://stockfolio-backend-jkpl.onrender.com/users/me", {
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
  let result = await fetch("https://stockfolio-backend-jkpl.onrender.com/users/logout",{
    credentials:"include"
  })
  if(result.ok){
     window.location.href = "/login";
  }
}

  return(
    <nav className="bg-gray-800 text-white px-6 py-4 flex gap-6 items-center">
        {user && (
            <>
                <Link to="/stocks">Stocks</Link>
                <Link to="/portfolio">Portfolio</Link>
            </>
        )}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {user && (
            <div className="ml-auto flex gap-4 items-center">
                <span>₹{user.balance}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )}
    </nav>
)
}

export default Navbar