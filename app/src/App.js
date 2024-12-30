import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import Topbar from "./components/Topbar/Topbar";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Load from "./Loader/Load";
import Register from "./components/Login/Register";
// import Sellitem from "./components/Sellitem/Sellitem";
import Sidebar from "./components/Sidebar/Sidebar";
import Marketplace from "./components/Marketplace/MarketPlace";
// import Toppick from "./components/Toppicks/Toppick";
import Home from "./components/Homepage/Home";
import Firsttab from "./components/Homepage/Firsttab";
import Viewdetails from "./components/Details/ViewDetails";
import Verify from "./components/Verifier/Verify";
import Verifier from "./components/Verifier/Verifier";
// import TopNav from "./components/Topbar/TopNav";
import Topbar from "./components/Topbar/Topbar";
import Nav from "./components/Topbar/Nav";
import Cart from "./components/Cart/Shopcart";
import Profile from "./components/Profile/Profile";
import Wishlist from "./components/Wishlist/Wishlist";
import Addproduct from "./components/Sellitem/Addproduct";
import Payment from "./components/Payment/Payment";
// import Sellproduct from "./components/Sellitem/Po";
import Car from "./components/Car.gif";
import Chat from "./components/Chat/Chat";
import Notification from "./components/Notification/Notification";
import Marketbread from "./components/Marketplace/Marketbread";
import Logreg from "./components/Login/Logreg";
import View from "./components/Details/test";
// import { useState } from "react";

// import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="Loadercar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "120px",
          flexDirection: "column",
        }}
      >
        <img src={Car} alt="Loading" />
        <h2 style={{ marginTop: "-90px" }}>Please Hold On ...</h2>
      </div>
    ); // Replace "loader.gif" with your image source
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logreg" element={<Logreg />} />
        <Route path="/load" element={<Load />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/sellitem" element={<Sellitem />} /> */}
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/market/:brand" element={<Marketbread />} />

        <Route path="/firsttab" element={<Firsttab />} />
        <Route path="/description/:_id" element={<Viewdetails />} />
        <Route path="/des/:_id" element={<View />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/topnav" element={<Topbar />} />
        <Route path="/head" element={<Nav />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/notification" element={<Notification />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/verify/:_id" element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
