import React, { useState, useEffect } from "react";
import "./Firsttab.css";
import { useNavigate } from "react-router";
import axios from "../../axios";

function Firsttab() {
  const [carData, setCarData] = useState([]); // State variable to store the car data fetched from the API
  // const [searchQuery, setSearchQuery] = useState("");
  console.log("search", searchQuery); // State variable to store the user's search query
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(-1);
  // const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        setCarData(response.data.cars);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/carBrand/${brand}`);
  //       setData(response.data.cars);
  //       console.log(response.data.cars);
  //       setwishList(Array(response.data.cars.length).fill(false));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    // setSelectedCar(null);
    setSelectedIdx(-1);
  };

  const filteredCarData = carData.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleCarSelection = (car) => {
  //   const carName = `${car.brand}`;
  //   navigate(`/market/${encodeURIComponent(carName)}`);
  // };

  // const handleCarSelection = (car) => {
  //   console.log("Selected car:", car);
  //   setSearchQuery(`${car.brand} - ${car.model}`);
  //   setSelectedIdx(-1);
  //   navigate(`/market/${encodeURIComponent(car.brand)}`);
  // };

  const handleCarSelection = (car) => {
    const carName = `${car.brand} - ${car.model}`;
    setSearchQuery(carName);
    setSelectedIdx(-1);
    setSelectedCar(carName); // Update selected car state
    navigate(`/market/${encodeURIComponent(car.brand)}`);
  };

  const handleKeyDown = (event) => {
    if (filteredCarData.length === 0) return;

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx > 0 ? prevIdx - 1 : filteredCarData.length - 1
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        setSelectedIdx((prevIdx) =>
          prevIdx < filteredCarData.length - 1 ? prevIdx + 1 : 0
        );
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIdx !== -1) {
          handleCarSelection(filteredCarData[selectedIdx]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="Backgroundcarimage">
      <div className="verified-cars-cont">
        <p className="verified-cars-text">Verified Cars</p>
      </div>
      <div className="verified-cars-cont2">
        <p className="verified-cars-text2">
          "Verified in Blockchain: Ensuring Trust and Transparency for Cars"
        </p>
      </div>
      {/* <div className="search-box-container">
        <input
          className="search-inputt"
          type="text"
          placeholder="Search Cars"
        />
        <button className="search-btnn">
          <i className="fas fa-search"></i>
        </button>
      </div> */}
      <div className="search-box-container">
        <div
          style={{
            bottom: "40px",
            top: "auto",
            position: "relative",
            left: "auto",
            zIndex: 9,
            margin: "0px",
            padding: "0px",
            border: "0px none rgb(70, 81, 102)",
            font: "14px Poppins",
            verticalAlign: "baseline",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              marginBottom: "28px",
              maxWidth: "680px",
              height: "60px",
              boxShadow: "rgba(126, 133, 148, 0.08) 0px 24px 48px 0px",
              borderRadius: "12px",
              boxSizing: "border-box",
              display: "flex",
              WebkitBoxPack: "justify",
              justifyContent: "space-between",
              WebkitBoxAlign: "center",
              alignItems: "center",
              position: "relative",
              margin: "0px 0px 28px",
              padding: "0px",
              border: "0px none rgb(70, 81, 102)",
              font: "14px Poppins",
              verticalAlign: "baseline",
            }}
          >
            <div
              style={{
                position: "relative",
                paddingBottom: "20px",
                width: "100%",
                margin: "0px",
                padding: "0px 0px 20px",
                border: "0px none rgb(70, 81, 102)",
                font: "14px Poppins",
                verticalAlign: "baseline",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  position: "relative",
                  margin: "0px",
                  padding: "0px",
                  border: "0px none rgb(70, 81, 102)",
                  font: "14px Poppins",
                  verticalAlign: "baseline",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "48px",
                    margin: "0px",
                    padding: "0px",
                    border: "0px none rgb(70, 81, 102)",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    boxSizing: "border-box",
                  }}
                >
                  <input
                    type="text"
                    // value=""
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    maxLength="1000"
                    autoComplete="off"
                    placeholder="Search for your favourite cars"
                    style={{
                      padding: "0px 24px 0px 52px",
                      border: "1px solid rgb(221, 229, 235)",
                      borderRadius: "12px",
                      zIndex: 1,
                      background:
                        "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box",
                      fontWeight: 400,
                      boxShadow: "none",
                      color: "rgb(70, 81, 102)",
                      position: "relative",
                      height: "48px",
                      paddingLeft: "52px",
                      fontSize: "16px",
                      lineHeight: "24px",
                      display: "block",
                      width: "100%",
                      backgroundColor: "rgb(255, 255, 255)",
                      WebkitBackgroundClip: "border-box",
                      transition:
                        "border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s",
                      overflow: "visible",
                      margin: "0px",
                      fontFamily: "Poppins",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                {searchQuery && (
                  <ul className="suggestions-list">
                    {filteredCarData.map((car, idx) => (
                      <li
                        key={car.id}
                        onClick={() => handleCarSelection(car)}
                        className={idx === selectedIdx ? "selected" : ""}
                      >
                        {car.brand} - {car.model}
                      </li>
                    ))}
                  </ul>
                )}

                <span
                  style={{
                    position: "absolute",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    top: "12px",
                    left: "16px",
                    zIndex: 9,
                    margin: "0px",
                    padding: "0px",
                    border: "0px none rgb(70, 81, 102)",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    width="24"
                    height="24"
                    src="https://assets.cars24.com/production/c2b-website/230703154720/js/8897caa63bb9c6fcaf6a05409a72490c.svg"
                    alt="Search Brand"
                    style={{
                      verticalAlign: "middle",
                      borderStyle: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </span>
              </div>
              <div
                style={{
                  marginTop: "4px",
                  width: "550px",
                  top: "48px",
                  zIndex: 999,
                  position: "absolute",
                  padding: "0px",
                  border: "0px none rgb(70, 81, 102)",
                  font: "14px Poppins",
                  verticalAlign: "baseline",
                  boxSizing: "border-box",
                }}
              ></div>
            </div>
          </div>
          <div
            className="brandlogo"
            style={{
              margin: "0px",
              padding: "0px",
              border: "0px none rgb(70, 81, 102)",
              font: "14px Poppins",
              verticalAlign: "baseline",
              alignItems: "center",
              display: "flex",
              boxSizing: "border-box",
            }}
          >
            <ul
              className="brandlogo"
              style={{
                marginBottom: "0px",
                listStyle: "outside none none",
                padding: "0px",
                border: "0px none rgb(70, 81, 102)",
                font: "14px Poppins",
                verticalAlign: "baseline",
                marginTop: "0px",
                boxSizing: "border-box",
              }}
            >
              <li
                className="brandlogo"
                style={{
                  display: "flex",
                  gap: "0px 16px",
                  margin: "0px",
                  padding: "0px",
                  border: "0px none rgb(70, 81, 102)",
                  font: "14px Poppins",
                  verticalAlign: "baseline",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="brandlogo"
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    className="brandlogo"
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      className="brandlogo"
                      src="https://fastly-production.24c.in/cars24/brand/maruti-suzuki.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="https://fastly-production.24c.in/cars24/brand/hyundai.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="https://fastly-production.24c.in/cars24/brand/honda.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="https://fastly-production.24c.in/cars24/brand/tata.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="https://fastly-production.24c.in/cars24/brand/ford.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="https://fastly-production.24c.in/cars24/brand/volkswagen.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="https://fastly-production.24c.in/cars24/brand/renault.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    padding: "8px 7px",
                    borderRadius: "12px",
                    border: "0px none rgb(70, 81, 102)",
                    backgroundColor: "rgb(250, 250, 250)",
                    // cursor: "pointer",
                    transition: "all 0.3s ease 0s",
                    width: "84px",
                    height: "64px",
                    position: "relative",
                    background:
                      "rgb(250, 250, 250) none repeat scroll 0% 0% / auto padding-box border-box",
                    WebkitBoxPack: "center",
                    justifyContent: "center",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    font: "14px Poppins",
                    verticalAlign: "baseline",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      color: "transparent",
                      display: "inline-blockmargin:0px",
                      padding: "0px",
                      border: "0px none rgba(0, 0, 0, 0)",
                      font: "14px Poppins",
                      verticalAlign: "baseline",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="https://fastly-production.24c.in/cars24/brand/mahindra.png"
                      style={{
                        width: "72px",
                        position: "absolute",
                        maxWidth: "100%",
                        inset: "0px",
                        margin: "auto",
                        height: "32px",
                        verticalAlign: "middle",
                        borderStyle: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </span>
                </div>
              </li>
            </ul>
            <div
              className="viewcars"
              style={{
                marginLeft: "24px",
                width: "188px",
                padding: "0px",
                border: "0px none rgb(70, 81, 102)",
                font: "14px Poppins",
                verticalAlign: "baseline",
                boxSizing: "border-box",
              }}
            >
              <button
                data-title=""
                type="button"
                onClick={() => navigate("/market")}
                style={{
                  height: "60px",
                  borderRadius: "12px",
                  color: "rgb(78, 78, 78)",
                  fontWeight: 600,
                  backgroundColor: "#ffbf00",
                  fontSize: "14px",
                  letterSpacing: "0.14px",
                  position: "relative",
                  padding: "0px 12px",
                  textAlign: "center",
                  display: "block",
                  width: "100%",
                  textTransform: "uppercase",
                  border: "0px none rgb(255, 255, 255)",
                  outline: "rgb(255, 255, 255) none 0px",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  verticalAlign: "middle",
                  userSelect: "none",
                  lineHeight: "21px",
                  transition:
                    "color 0.15s ease-in-out 0s, background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s",
                  appearance: "button",
                  overflow: "visible",
                  margin: "0px",
                  boxSizing: "border-box",
                }}
              >
                VIEW all CARS
                {/* */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Firsttab;
