import {Routes, Route} from "react-router-dom";
import StockList from "./pages/StockList.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Portfolio from "./pages/Portfolio.jsx";

function App(){
  return(
    <Routes>
      <Route path="/" element={<StockList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  )
}

export default App