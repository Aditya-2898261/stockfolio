import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import StockList from "./pages/StockList.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Portfolio from "./pages/Portfolio.jsx";

function App(){
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/stocks" element={<StockList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
    </>
  )
}

export default App