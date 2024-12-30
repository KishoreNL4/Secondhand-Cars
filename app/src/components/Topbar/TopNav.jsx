import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiBell,
} from "react-icons/fi";
import "./TopNav.css";
import Wishlist from "../Wishlist/Wishlist";
import Notification from "../Notification/Notification";
import Login from "../Login/Login";
import Logreg from "../Login/Logreg";
import Carlogo from "./cars-valley.png";

const TopNav = () => {
  const navigate = useNavigate();
  const [isWishlistPopupOpen, setIsWishlistPopupOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    // Update hasNotifications state based on actual notifications
    const checkNotifications = () => {
      // For demonstration purposes, you might set this based on your real notification data
      setHasNotifications(true);
    };

    checkNotifications();
  }, []);

  useEffect(() => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    setIsUserLoggedIn(!!userCookie);
  }, []);

  const handleHeartIconClick = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      setIsWishlistPopupOpen(true);
    } else {
      alert("Please login to add to wishlist.");
    }
  };

  const handleCartIconClick = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      navigate("/cart");
    } else {
      alert("Please login to view cart.");
    }
  };

  const handleBellIconClick = () => {
    setIsNotificationPopupOpen(!isNotificationPopupOpen);
  };

  const toggleUserPopup = () => {
    const userCookie = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("user_token="));

    if (isUserLoggedIn) {
      navigate("/profile");
    } else {
      setIsUserPopupOpen(!isUserPopupOpen);
    }
  };

  const handleCloseUserPopup = () => {
    setIsUserPopupOpen(false);
  };

  return (
    <nav className="nav-containerbar">
      <div className="logo1">
        <Link to="/">
          <img
            className="logo11"
            src={Carlogo}
            alt="Your Logo"
            onClick={() => navigate("/")}
          />
        </Link>
      </div>
      {/* <div className="headsea">
        <input type="text" placeholder="Search" />
        <button>
          <FiSearch />
        </button>
      </div> */}
      <div className="right-icons">
        <button
          className="verifierbut"
          onClick={() => {
            window.open("http://localhost:8080/verif-login");
          }}
        >
          <span class="textverify" style={{ marginTop: "10px" }}>
            Verifier
          </span>
          <span>Login</span>
        </button>
        <div className="user-container">
          <div
            className="fiuser"
            onClick={toggleUserPopup}
            style={{ marginRight: "40px", fontSize: "21px", cursor: "pointer" }}
          >
            <FiUser />
          </div>
          {isUserPopupOpen && (
            <>
              {" "}
              <div className="overlay" onClick={handleCloseUserPopup} />
              <div className="user-popup-left">
                {/* Place your user popup content here */}
                {/* For example: */}
                <div>
                  <div className="closeiconn" onClick={handleCloseUserPopup}>
                    &times;
                  </div>
                  {/* <h2>User Popup Content</h2>
                <p>Any content you want to display in the user popup.</p> */}
                  <Logreg />
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className="fiheart"
          onClick={handleHeartIconClick}
          style={{ marginRight: "40px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiHeart />
        </div>
        <div
          className="fibell"
          onClick={handleBellIconClick}
          style={{ marginRight: "20px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiBell />
        </div>
      </div>
      {isNotificationPopupOpen && (
        <div
          className="popupnot"
          onMouseLeave={() => setIsNotificationPopupOpen(false)}
        >
          <Notification />
        </div>
      )}
      {isWishlistPopupOpen && (
        <div
          className="popup"
          onMouseLeave={() => setIsWishlistPopupOpen(false)}
        >
          <Wishlist />
        </div>
      )}
    </nav>
  );
};

export default TopNav;
