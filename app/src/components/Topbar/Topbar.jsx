import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
// import Login from "../Login/Login";

function Topbar() {
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="head">
        <img
          className="logo"
          src="https://www.linkpicture.com/q/cars-valley-removebg-preview.png"
          alt=""
        />

        <div className="headcar">
          <span className="textb">Buy Car</span>
          <span className="textc" onClick={() => navigate("/sellitem")}>
            Sell Car
          </span>
        </div>
        {/* <button className="heart">{String.fromCharCode(9825)}</button> */}

        <div
          style={{
            marginLeft: "auto",
            marginRight: "60px",
          }}
        >
          <button
            role="button"
            class="Login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* {showModal && <Login />} */}
    </div>
  );
}

export default Topbar;
