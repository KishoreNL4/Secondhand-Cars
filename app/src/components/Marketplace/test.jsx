import React, { useState, useEffect } from "react";
import "./Marketplace.css";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import TopNav from "../Topbar/TopNav";
import check from "./Check.png";

const Marketplace = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([5000, 2000000]);

  const [transmission, setTransmission] = useState([]);
  const [data, setData] = useState([]);
  const [iswishListed, setwishList] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [carId, setCarsId] = useState([]);

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleFavoriteClick = async (carId) => {
    try {
      console.log(carId);
      const response = await axios.get(`/wishlist/${carId}`);
      console.log(response.data.wishlist);

      const updatedWishList = {
        ...iswishListed,
        [carId]: true,
      };
      setwishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFuelTypeChange = (event) => {
    const { checked, value } = event.target;
    let updatedFuelTypes = [...selectedFuelTypes];

    if (checked) {
      updatedFuelTypes.push(value);
    } else {
      updatedFuelTypes = updatedFuelTypes.filter((item) => item !== value);
    }

    setSelectedFuelTypes(updatedFuelTypes);
  };

  const handleFavoriteRemove = async (carId) => {
    try {
      console.log(carId);
      const response = await axios.get(`/removewishlist/${carId}`);
      console.log(response.data.wishlist);

      const updatedWishList = {
        ...iswishListed,
        [carId]: false,
      };
      setwishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } catch (error) {
      console.error(error);
    }
  };

  const descript = (id) => {
    navigate(`/description/${id}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleBrandChange = (event) => {
    const { checked, value } = event.target;
    let updatedBrands = [...selectedBrands];

    if (checked) {
      updatedBrands.push(value);
    } else {
      updatedBrands = updatedBrands.filter((item) => item !== value);
    }

    setSelectedBrands(updatedBrands);
  };

  const handleTransmissionChange = (event) => {
    const { checked, value } = event.target;
    let updatedTransmission = [...transmission];

    if (checked) {
      updatedTransmission.push(value);
    } else {
      updatedTransmission = updatedTransmission.filter(
        (item) => item !== value
      );
    }

    setTransmission(updatedTransmission);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        setData(response.data.cars);
        const carsID = response.data.cars.map((cars) => cars._id);
        setCarsId(carsID);
        setwishList(Array(response.data.cars.length).fill(false));

        try {
          const responsee = await axios.get(`/image/${carsID}`);

          const updatedDaata = data.map((cars) => ({
            ...cars,

            imageUrl:
              responsee.data.find((data) => data._id === cars._id)?.imageUrl ||
              null,
          }));

          setData(updatedDaata);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setwishList(JSON.parse(storedWishList));
    }
  }, []);

  return (
    <>
      <TopNav />

      <div className="container">
        <div className="range-container">
          <div className="range-wrapper">
            <h2 className="range-title">Price Range</h2>
            <p className="range-values">
              <span>{formatAmount(priceRange[0])}</span>
              <span>{formatAmount(priceRange[1])}</span>
            </p>

            <Range
              step={50000}
              min={5000}
              max={2000000}
              values={priceRange}
              onChange={handlePriceRangeChange}
              renderTrack={({ props, children }) => (
                <div {...props} className="range-track">
                  {children}
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  className={`range-thumb ${isDragged ? "dragged" : ""}`}
                />
              )}
            />

            <p>
              <span className="dot">Min</span>
              <span className="value">Max</span>
            </p>

            <div className="search-container">
              <p className="search-title">Brands + Models</p>
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={handleSearchInputChange}
              />
              <AiOutlineSearch className="search-icon" />
              <p className="top-brands">Top Brands</p>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="KIA"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Kia</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Hyundai"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Hyundai</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Renault"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Renault</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="TATA"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Tata</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Ford"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Ford</span>
                <span className="brand-count"></span>
              </label>
            </div>

            {/* <div className="year-container">
              <p className="year-title">Year</p>

              <select
                className="year-dropdown"
                value={selectedYear}
                onChange={handleYearChange}
              >
                <option value="">All Years</option>
                <option value="2020">2020 & above</option>
                <option value="2018">2018 & above</option>
                <option value="2016">2016 & above</option>
                <option value="2014">2014 & above</option>
                <option value="2012">2012 & above</option>
              </select>
            </div> */}

            <p className="top-brands">Fuel Type</p>
            <label className="brand-checkbox">
              <input
                type="checkbox"
                value="Petrol"
                onChange={handleFuelTypeChange}
              />
              <span className="brand-name">Petrol</span>
              <span className="brand-count"></span>
            </label>
            <label className="brand-checkbox">
              <input
                type="checkbox"
                value="Diesel"
                onChange={handleFuelTypeChange}
              />
              <span className="brand-name">Diesel</span>
              <span className="brand-count"></span>
            </label>
            <label className="brand-checkbox">
              <input
                type="checkbox"
                value="EV"
                onChange={handleFuelTypeChange}
              />
              <span className="brand-name">EV</span>
              <span className="brand-count"></span>
            </label>

            <p className="top-brands">Transmisssion</p>
            <label className="brand-checkbox">
              <input
                type="checkbox"
                value="Automatic"
                onChange={handleTransmissionChange}
              />
              <span className="brand-name">Automatic</span>
              <span className="brand-count"></span>
            </label>
            <label className="brand-checkbox">
              <input
                type="checkbox"
                value="Manual"
                onChange={handleTransmissionChange}
              />
              <span className="brand-name">Manual</span>
              <span className="brand-count"></span>
            </label>
          </div>
          <div className="marketgrid">
            {Array.isArray(data) && data.length > 0 ? (
              data
                .filter((cars) => {
                  const brandModel =
                    `${cars.brand} ${cars.model}`.toLowerCase();
                  return (
                    brandModel.includes(searchInput.toLowerCase()) &&
                    cars.price >= priceRange[0] &&
                    cars.price <= priceRange[1] &&
                    (transmission.length === 0 ||
                      transmission.includes(cars.transmission)) &&
                    (selectedBrands.length === 0 ||
                      selectedBrands.includes(cars.brand)) &&
                    (selectedFuelTypes.length === 0 ||
                      selectedFuelTypes.includes(cars.fueltype))
                  );
                })

                // Rest of the code...

                .map((cars, index) => (
                  <div key={cars._id} className="car-card">
                    {cars.verifyStatus === "verified" && (
                      <img src={check} className="check-icon" alt="Check" />
                    )}
                    <img
                      className="car-image"
                      onClick={() => descript(cars._id)}
                      src={cars.imageUrl}
                      alt="car"
                    />

                    <div className="favorite-icon">
                      {iswishListed[cars._id] ? (
                        <FaHeart
                          className="heart-icon"
                          onClick={() => handleFavoriteRemove(cars._id)}
                        />
                      ) : (
                        <AiOutlineHeart
                          className="heart-icon"
                          onClick={() => handleFavoriteClick(cars._id)}
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="car-titlele">
                        Car:{" "}
                        <span
                          className="placeholder"
                          style={{ textDecoration: "none" }}
                        >
                          {cars.brand || "Brand Placeholder"}
                        </span>
                      </h3>
                      <p className="car-infole">
                        <span className="label">Model:</span>{" "}
                        {cars.model || "Model Placeholder"}
                      </p>
                      <p className="car-pricele">
                        <span className="label">Price:</span> ₹
                        <span className="placeholder">
                          {cars.price
                            ? cars.price.toLocaleString("en-IN")
                            : "Price Placeholder"}
                        </span>
                      </p>

                      <div className="car-locationle">
                        <div className="location-icon" />
                        <span className="label">Location:</span>{" "}
                        {cars.address || "Address Placeholder"}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>No Cars available.</p>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Marketplace;
