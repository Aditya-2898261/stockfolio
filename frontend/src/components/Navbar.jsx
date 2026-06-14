import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav>
            <Link to="/">Stocks</Link> |{" "}
            <Link to="/portfolio">Portfolio</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>
        </nav>
    )
}

export default Navbar