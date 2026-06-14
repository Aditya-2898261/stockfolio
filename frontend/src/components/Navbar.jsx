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
        <nav>
            <Link to="/">Stocks</Link> |{" "}
            <Link to="/portfolio">Portfolio</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>|{" "}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar