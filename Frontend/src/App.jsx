import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/home";
import Cart from "./pages/cart/cart";
import Placeorder from "./pages/placeOrder/placeOrder";
import Footer from "./components/Footer/Footer";
import App_download from "./components/AppDownload/App_download";
import { useState } from "react";
import Login_Popup from "./components/LoginPopup/Login_Popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import Myorders from "./pages/myOrders/Myorders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login_Popup setShowLogin={setShowLogin} /> : <></>}
      <div className="App">
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<Myorders />} />
        </Routes>
      </div>
      <App_download />
      <Footer />
    </>
  );
};

export default App;
