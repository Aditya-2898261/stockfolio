import { Link } from "react-router-dom";

function Navbar(){

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
            <Link to="/">Stocks</Link> 
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/login">Login</Link> 
            <Link to="/signup">Signup</Link>
            <button onClick={handleLogout} className="ml-auto">Logout</button>
        </nav>
    )
}

export default Navbar