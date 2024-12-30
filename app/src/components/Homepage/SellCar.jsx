import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./SellCar.css";

function SellCar() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    setIsUserLoggedIn(!!userCookie);
  }, []);

  const handleSellCarClick = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      navigate("/sidebar");
    } else {
      alert("Please login to sell your car.");
    }
  };
  return (
    // <div style={{ display: "flex", flexDirection: "row", marginLeft: "70px" }}>
    //   <div
    //     style={{
    //       flex: 1,
    //       margin: "0px",
    //       padding: "20px 0px",
    //       border: "0px none rgb(70, 81, 102)",
    //       font: "14px Poppins, sans-serif",
    //       verticalAlign: "baseline",
    //       boxSizing: "border-box",
    //     }}
    //   >
    //     <h2
    //       style={{
    //         fontSize: "30px",
    //         lineHeight: "36px",
    //         marginBottom: "28px",
    //         fontFamily: "Poppins, sans-serif",
    //         fontWeight: 700,
    //         color: "rgb(0, 36, 65)",
    //         margin: "0px 0px 28px",
    //         padding: "0px",
    //         border: "0px none rgb(0, 36, 65)",
    //         verticalAlign: "baseline",
    //         marginTop: "0px",
    //         boxSizing: "border-box",
    //       }}
    //     >
    //       Selling a car? We’re buying!
    //     </h2>
    //     <p
    //       style={{
    //         marginBottom: "0px",
    //         fontSize: "20px",
    //         padding: "0px 0px 42px",
    //         border: "0px none rgb(70, 81, 102)",
    //         verticalAlign: "baseline",
    //         marginTop: "0px",
    //         boxSizing: "border-box",
    //       }}
    //     >
    //       Get up to ₹20,000 exchange bonus when you sell and buy your next car
    //       from us
    //     </p>
    //     <button
    //       onClick={handleSellCarClick}
    //       data-title=""
    //       type="button"
    //       style={{
    //         color: "rgb(78, 78, 78)",
    //         fontWeight: 600,
    //         // width: "10px",
    //         backgroundColor: "#ffbf00",
    //         fontSize: "14px",
    //         letterSpacing: "0.14px",
    //         position: "relative",
    //         height: "48px",
    //         padding: "0px 12px",
    //         borderRadius: "12px",
    //         textAlign: "center",
    //         display: "block",
    //         width: "40%",
    //         textTransform: "uppercase",
    //         border: "0px none rgb(255, 255, 255)",
    //         outline: "rgb(255, 255, 255) none 0px",
    //         fontFamily: "Poppins",
    //         cursor: "pointer",
    //         whiteSpace: "nowrap",
    //         verticalAlign: "middle",
    //         userSelect: "none",
    //         lineHeight: "21px",
    //         transition:
    //           "color 0.15s ease-in-out 0s, background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s",
    //         appearance: "button",
    //         overflow: "visible",
    //         margin: "0px",
    //         boxSizing: "border-box",
    //       }}
    //     >
    //       SELL MY CAR
    //     </button>
    //   </div>
    //   <div
    //     style={{
    //       flex: 1,
    //       margin: "0px",
    //       padding: "0px",
    //       border: "0px none rgb(70, 81, 102)",
    //       font: "14px Poppins, sans-serif",
    //       verticalAlign: "baseline",
    //       boxSizing: "border-box",
    //     }}
    //   >
    //     <span
    //       style={{
    //         display: "block",
    //         margin: "0px",
    //         padding: "0px",
    //         border: "0px none rgba(0, 0, 0, 0)",
    //         font: "14px Poppins, sans-serif",
    //         verticalAlign: "baseline",
    //         boxSizing: "border-box",
    //       }}
    //     >
    //       <img
    //         src="https://assets.cars24.com/production/c2b-website/230703154720/js/a6b634b675fb540422b4fa5769e7e3cf.png"
    //         style={{
    //           verticalAlign: "middle",
    //           borderStyle: "none",
    //           boxSizing: "border-box",
    //           height: "300px",
    //         }}
    //       />
    //     </span>
    //   </div>
    // </div>
    <div className="sellcaritem">
      <div className="sellCarItem1">
        <h2>Selling a car? We’re buying!</h2>
        <p>
          Get up to ₹20,000 exchange bonus when you sell and buy your next car
          from us
        </p>
        <button onClick={handleSellCarClick} className="sellCarButton">
          SELL MY CAR
        </button>
      </div>
      <div className="sellCarItem2">
        <img
          src="https://assets.cars24.com/production/c2b-website/230703154720/js/a6b634b675fb540422b4fa5769e7e3cf.png"
          alt="Car Image"
          className="sellCarImage"
        />
      </div>
    </div>
  );
}

export default SellCar;
