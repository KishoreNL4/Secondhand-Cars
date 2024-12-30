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

const TopNav = () => {
  const navigate = useNavigate();
  const [isWishlistPopupOpen, setIsWishlistPopupOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

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
    setIsUserPopupOpen(!isUserPopupOpen);
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
            src="https://www.linkpicture.com/q/cars-valley-removebg-preview.png"
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
        <div className="user-container">
          <div
            onClick={toggleUserPopup}
            style={{ marginRight: "40px", fontSize: "21px", cursor: "pointer" }}
          >
            <FiUser />
          </div>
          {isUserPopupOpen && (
            <div className="user-popup-left">
              {/* Place your user popup content here */}
              {/* For example: */}
              <div>
                <div className="closeiconn" onClick={handleCloseUserPopup}>
                  &times;
                </div>
                {/* <h2>User Popup Content</h2>
                <p>Any content you want to display in the user popup.</p> */}
                <Login />
              </div>
            </div>
          )}
        </div>
        <div
          onClick={handleHeartIconClick}
          style={{ marginRight: "40px", fontSize: "21px", cursor: "pointer" }}
        >
          <FiHeart />
        </div>
        <div
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
