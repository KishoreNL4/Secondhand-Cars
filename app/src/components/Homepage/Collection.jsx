import React, { useState } from "react";
import "./Collection.css";
import { useNavigate } from "react-router-dom";
import Mahindra from "./Mahindra.jpg";
import Tata from "./Tata.jpg";
import Hyundai from "./Hyundai.jpg";
import Maru from "./Maru.jpg";
function Collection() {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const navigate = useNavigate();
  const handleHover = (index) => {
    setFocusedIndex(index);
  };

  const handleImageClick = (brand) => {
    console.log("clicked");
    navigate(`/market/${brand}`);
  };

  return (
    <div className="top-picks-section">
      <h2 style={{ color: "#008080" }}>Collections</h2>
      <div className="Collectionpicks">
        <div className="grid-container">
          <div
            className={`card-1 large-card ${
              focusedIndex === 0 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={() => handleHover(null)}
          >
            <a
              href={`/market/Maruti`}
              onClick={() => handleImageClick("Maruti")}
            >
              <img className="imglargecard" src={Maru} alt="SareeCol1" />
              <h3
                className="Sarecol"
                style={{ marginLeft: "-300px", top: "10px" }}
              >
                Maruti
              </h3>
            </a>
          </div>
          <div
            className={`card-1 small-card ${
              focusedIndex === 1 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(null)}
          >
            <a
              href={`/market/Mahindra`}
              onClick={() => handleImageClick("Mahindra")}
            >
              <img
                className="imgsmallcardMahi"
                src={Mahindra}
                alt="SareeCol1"
              />
              <h3
                className="Sarecol"
                style={{ marginLeft: "-120px", top: "10px" }}
              >
                Mahindra
              </h3>
            </a>
          </div>
        </div>
        <br />
        <div className="grid-container1">
          <div
            className={`card-1 small-card1 ${
              focusedIndex === 2 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleHover(null)}
          >
            <a
              href={`/market/Hyundai`}
              onClick={() => handleImageClick("Hyundai")}
            >
              <img className="imgsmallcard" src={Hyundai} alt="SareeCol1" />
              <h3
                className="Sarecol"
                style={{ marginLeft: "-70px", top: "10px" }}
              >
                Hyundai
              </h3>
            </a>
          </div>
          <div
            style={{ backgroundColor: "white" }}
            className={`card-1 small-card2 ${
              focusedIndex === 3 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(null)}
          >
            <a href={`/market/Tata`} onClick={() => handleImageClick("Tata")}>
              <img className="imgsmallcardtata" src={Tata} alt="SareeCol1" />
              <h3
                className="Sarecol"
                style={{ marginLeft: "-220px", top: "10px" }}
              >
                Tata
              </h3>
            </a>
          </div>
          <div
            className={`card-1 medium-card1 ${
              focusedIndex === 4 ? "focused" : ""
            }`}
            onMouseEnter={() => handleHover(4)}
            onMouseLeave={() => handleHover(null)}
          >
            <a href={`/market/Kia`} onClick={() => handleImageClick("Kia")}>
              <img
                className="imgsmallcard"
                src="https://www.kia.com/content/dam/kia2/in/en/images/our-vehicles/seltos/showroom/x-line/Seltos_X_Line-Section_1.jpg"
                alt="SareeCol1"
              />
              <h3
                className="Sarecol"
                style={{ marginLeft: "-80px", top: "10px" }}
              >
                Kia
              </h3>
            </a>
          </div>
        </div>
      </div>
      <br />
      <br />

      <button className="viewallbut">
        <p onClick={() => navigate("/market")}>View All</p>
        <svg
          stroke-width="4"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
      <br />
      <br />
      {/* <div class="max-w-screen-2xl mx-auto px-4 py-16 lg:py-24 relative bg-white">
        <div class="flex flex-col md:flex-row gap-2">
          <div class="flex flex-1 flex-col cursor-pointer ">
            <div class="relative">
              <img class="object-cover h-[583px]" src={Mahindra} alt="" />
              <h3 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl">
                Vitange Kanchipuram
              </h3>
            </div>
          </div>
          <div class="flex flex-1">
            <div class="grid grid-cols-2 gap-2">
              <div class="relative cursor-pointer ">
                <img class="object-cover w-72 h-72" src={Mahindra} alt="" />
                <h3 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl">
                  Bridal Kanchipuram
                </h3>
              </div>
              <div class="relative cursor-pointer ">
                <img class="object-cover w-72 h-72" src={Mahindra} alt="" />
                <h3 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl">
                  Pastels
                </h3>
              </div>
              <div class="relative  cursor-pointer">
                <img class="object-cover w-72 h-72" src={Mahindra} alt="" />
                <h3 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl">
                  Simple Kanchipuram
                </h3>
              </div>
              <div class="relative cursor-pointer">
                <img
                  class="object-cover w-72 h-72"
                  src="kalamkari.jpeg"
                  alt=""
                />
                <h3 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl">
                  Kalamkari
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Collection;
