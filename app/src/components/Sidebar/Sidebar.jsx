import React, { useState, useEffect } from "react";
import "./Sidebar.scss";

import { useNavigate } from "react-router";

import TopNav from "../Topbar/TopNav";
// import Footer from "../Footer/Footer";
import jwtDecode from "jwt-decode";
import axios from "../../axios";
import { useCookies } from "react-cookie";
// import "bourbon/bourbon";

function Sidebar() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const token = jwtDecode(cookies.user_token);
  const [daata, setDaata] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Collection");
  const navigate = useNavigate();
  //  const descript = (id) => {
  //    navigate(`/sellerdescription/${id}`);
  //  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  const handleSellCarClick = () => {
    handleMenuClick("Product");
  };

  // const handleCollectionClick = () => {
  //   handleMenuClick("Collection");
  // };

  const reloadPage = () => {
    setShouldReload(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        console.log(response.data.cars);
        setDaata(response.data.cars);
        response.data.cars.forEach((car) => {
          console.log(car.name);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedMenu === "Collection") {
      fetchData();
    }
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedMenu === "Collection" && shouldReload) {
      window.location.reload();
      setShouldReload(false); // Reset the state to avoid infinite reloads
    }
  }, [selectedMenu, shouldReload]);

  const logout = () => {
    removeCookie("user_token");

    navigate("/", { replace: true });
  };

  const handleCollectionClick = () => {
    handleMenuClick("Collection");
    reloadPage(); // Call the reloadPage function when the "Collection" menu is clicked
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        console.log(response.data.cars);
        setDaata(response.data.cars);

        // Calculate the date 10 days from now
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(tenDaysFromNow.getDate() + 10);

        // Filter cars whose insurance is going to expire in 10 days
        const carsToNotify = response.data.cars.filter((car) => {
          return new Date(car.insurencevalidity) <= tenDaysFromNow;
        });

        // Send a notification for each car that is expiring soon
        carsToNotify.forEach((car) => {
          const message = `Car ${car._id} insurance is expiring soon. Please renew it.`;
          showNotification(message);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedMenu === "Collection") {
      fetchData();
    }
  }, [selectedMenu]);

  // Function to show the notification (Replace this with your actual notification logic)
  const showNotification = (message) => {
    // In a real-world application, use a proper notification library or service
    // For demonstration purposes, we'll just use console.log to simulate the notification
    console.log("Notification:", message);
  };

  return (
    <div>
      <TopNav />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="sidebar-container"
          style={{
            width: "21%",
            height: "50vh",
          }}
        >
          <div className="app">
            <aside className="sidebar">
              {/* <header></header> */}
              <nav className="sidebar-nav">
                <h4 className="Dashhead">Dashboard</h4>
                <br />
                <br />
                <div className="dashalign">
                  <ul>
                    <a href="#" onClick={handleSellCarClick}>
                      <p
                        className="dashcontect"
                        style={{
                          fontSize: "18px",
                          marginLeft: "60px",
                          cursor: "pointer",
                          fontFamily: "sans-serif",
                          textDecoration: "none",
                          color:
                            selectedMenu === "Product" ? "#FFBF00" : "white",
                          fontSize:
                            selectedMenu === "Product" ? "19px" : "18px",
                        }}
                      >
                        Sell Car
                      </p>
                    </a>

                    <a href="#" onClick={handleCollectionClick}>
                      <p
                        className="dashcontect"
                        style={{
                          fontSize: "18px",
                          marginLeft: "60px",
                          marginTop: "30px",
                          cursor: "pointer",
                          textDecoration: "none",
                          fontFamily: "sans-serif",
                          color:
                            selectedMenu === "Collection" ? "#FFBF00" : "white",
                          fontSize:
                            selectedMenu === "Collection" ? "19px" : "18px",
                        }}
                      >
                        Collection
                      </p>
                    </a>
                    <a href="#" onClick={logout}>
                      <i
                        className="ion-ios-analytics-outline"
                        // style={{ display: "flex", }}
                      ></i>{" "}
                      <p
                        className="dashcontect"
                        style={{
                          fontSize: "18px",
                          marginLeft: "60px",
                          marginTop: "330px",
                          color: "red",
                          cursor: "pointer",
                          textDecoration: "none",
                          fontFamily: "sans-serif",
                          transition: "transform 0.2s", // Adding the transition for smooth effect
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateZ(2px)"; // Apply the hover effect
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "none"; // Reset the transform on mouse out
                        }}
                      >
                        Logout
                      </p>
                    </a>
                  </ul>
                </div>
              </nav>
            </aside>
          </div>
        </div>
        <div
          style={{
            width: "84%",
            height: "90vh",
            backgroundColor: "RGB(243, 244, 245)",
            marginTop: "20px",

            // position: "fixed",
          }}
        >
          <div className="dashorder">
            {selectedMenu === "Product" && (
              <div style={{ minHeight: "500px" }}>
                {/* <p className="innerhead">Products</p> */}
                <p className="innerorder">
                  Add the product that you would like to sell.
                </p>
                <button
                  className="addpro"
                  onClick={() => navigate("/addproduct")}
                >
                  Add Product
                </button>
              </div>
            )}

            {selectedMenu === "Collection" && (
              <div className="carcardcar">
                <div className="card-card">
                  {Array.isArray(daata) && daata.length > 0 ? (
                    daata.map((car) => (
                      <div
                        key={car._id}
                        className="carr-card"
                        // onClick={() => descript(pet._id)}
                      >
                        <div>
                          <div className="sidecarimg">
                            <img
                              className="car-imagee"
                              alt="car"
                              src={car.imageUrl}
                            />
                          </div>
                          <br />

                          <h3 className="car-titlele">
                            Car:{" "}
                            <span
                              className="placeholder"
                              style={{ textDecoration: "none" }}
                            >
                              {car.brand || "Brand Placeholder"}
                            </span>
                          </h3>
                          <p className="car-infole">
                            <span className="label">Model:</span>{" "}
                            {car.model || "Model Placeholder"}
                          </p>
                          <p className="car-pricele">
                            <span className="label">Price:</span> ₹
                            <span className="placeholder">
                              {car.price
                                ? Number(car.price).toLocaleString("en-IN")
                                : "Price Placeholder"}
                            </span>
                          </p>
                          <div className="car-locationle">
                            <div className="location-icon" />
                            <span className="label">Location:</span>{" "}
                            {car.address || "Address Placeholder"}
                          </div>
                        </div>
                        <br />
                      </div>
                    ))
                  ) : (
                    <p className="notavalaible">No Cars available.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
