import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [daata, setDaata] = useState([]);

  const removeFromWishlist = async (carId) => {
    try {
      const response = await axios.get(`/removewishlist/${carId}`);
      console.log(response.data.wishlist);

      // Remove item from wishlist state
      setWishlist((prevList) => prevList.filter((car) => car._id !== carId));

      // Remove item from localStorage
      const localStorageWishlist = JSON.parse(localStorage.getItem("wishlist"));
      const updatedLocalStorageWishlist = localStorageWishlist.filter(
        (car) => car._id !== carId
      );
      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedLocalStorageWishlist)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/allCars", {
          withCredentials: true,
        });
        const allCars = response.data?.cars ?? [];
        const filteredWishlist = allCars.filter(
          (car) => car.isWishlisted === "wishlisted"
        );
        setWishlist(filteredWishlist);
        console.log("wishlist", filteredWishlist);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="Wishlist">
      <div className="Wishlist1">
        <h3 style={{ marginLeft: "10px", color: "#00154D" }}>Wishlist</h3>
        <hr className="line" />

        <div className="Wishlist2">
          {wishlist.length > 0 ? (
            wishlist.map((car) => (
              <div className="Wishcard" key={car._id}>
                <div className="Wishcard1">
                  <div className="Wishcard1">
                    <div className="wishdiv">
                      <img
                        className="wishimg"
                        src={car.imageUrl}
                        alt={car.name}
                      />
                    </div>
                    <div className="wishcardwi">
                      <div>
                        <h3
                          className="car-titlele"
                          style={{ marginTop: "2px" }}
                        >
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
                      </div>
                      <Link to={`/description/${car._id}`}>
                        <button className="viewbutwish">View</button>
                      </Link>
                      <button
                        className="viewbutwish"
                        onClick={() => removeFromWishlist(car._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
