import React, { useState } from "react";
import Topbar from "../Topbar/Topbar";
import "./Landing.css";
import TopNav from "../Topbar/TopNav";

function Landing() {
  const [showPopularContent, setShowPopularContent] = useState(true);
  const [showRecentlyAddedContent, setShowRecentlyAddedContent] =
    useState(false);

  const handlePopularClick = () => {
    setShowPopularContent(true);
    setShowRecentlyAddedContent(false);
  };

  const handleRecentlyAddedClick = () => {
    setShowPopularContent(false);
    setShowRecentlyAddedContent(true);
  };

  return (
    <div className="bground">
      <TopNav />

      <br />

      <div className="head1">
        <br />
        <br />
        <br />
        <div className="t4">
          <h4 className="t1">
            “I love old cars that have a retro style, a kind of antique look.
            I’m just more in tune with that, more than anything else”
          </h4>
          <br />
          <button className="t3">
            <p>Get Started</p>
            <svg
              strokeWidth="4"
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </button>
        </div>
        <img
          className="t2"
          src="https://www.linkpicture.com/q/ford.jpg"
          alt=""
        />
        <br />
        <br />
        <br />
      </div>
      <br />
      <h5 className="Featured">Featured Cars</h5>
      <div className="newcars">
        <div className="Popular" onClick={handlePopularClick}>
          POPULAR
        </div>
        <div className="Recent" onClick={handleRecentlyAddedClick}>
          RECENTLY ADDED
        </div>
      </div>
      <br />
      <br />
      <div className="pcar">
        {showPopularContent && (
          <div className="popularcars">
            <div className="pc1">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9QX7hLL7wRt6BgNtFE_vPuG_uzG9DAAB6glKXTJiYtA&usqp=CAU&ec=48600113"
                alt="Car"
                className="car-image"
              />
            </div>
            <div className="car-details">
              <h4 className="car-name">honda</h4>
              <p className="car-model">civic</p>
              <p className="car-price">$2,00,000</p>
              <button className="view-details">View More Details</button>
              <br />
            </div>
          </div>
        )}

        {showRecentlyAddedContent && (
          <div className="recentlyadded">
            <div className="pc2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpL8lXNMUL_N3fFvEaefDAir7bCqLE-56uI2d9UYbH0g&usqp=CAU&ec=48600113"
                alt="Car"
                className="car-image"
              />
            </div>
            <div className="car-details">
              <h4 className="car-name">Kia</h4>
              <p className="car-model">Seltos</p>
              <p className="car-price">$6,00,000</p>
              <button className="view-details">View More Details</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
