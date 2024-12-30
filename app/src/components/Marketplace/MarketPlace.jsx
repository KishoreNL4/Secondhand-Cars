import React, { useState, useEffect } from "react";
import "./Marketplace.css";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import check from "./Check.png";
import ReactPaginate from "react-paginate";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import TopNav from "../Topbar/TopNav";

const Marketplace = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([5000, 5000000]);

  const [transmission, setTransmission] = useState([]);

  const [data, setData] = useState([]);
  const [iswishListed, setwishList] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedtransmission, setSelectedTransmission] = useState([]);

  const [carId, setCarsId] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Adjust this based on your preference
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  useEffect(() => {
    // Logic for paginated data
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Update paginated data
    setPaginatedData(paginatedData);
  }, [currentPage, filteredData]);
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

    setSelectedTransmission(updatedTransmission);
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
        console.log(response.data.cars);
        setwishList(Array(response.data.cars.length).fill(false));
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

  useEffect(() => {
    const filterData = () => {
      let filteredCars = data;

      // Filter by selected brands
      if (selectedBrands.length > 0) {
        filteredCars = filteredCars.filter((car) =>
          selectedBrands.includes(car.brand)
        );
      }

      // Filter by search input
      if (searchInput !== "") {
        const searchTerm = searchInput.toLowerCase();
        filteredCars = filteredCars.filter(
          (car) =>
            car.brand.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm)
        );
      }

      // Filter by selected fuel types
      if (selectedFuelTypes.length > 0) {
        filteredCars = filteredCars.filter((car) =>
          selectedFuelTypes.includes(car.fueltype)
        );
      }

      // Filter by selected transmission types
      if (selectedtransmission.length > 0) {
        filteredCars = filteredCars.filter((car) =>
          selectedtransmission.includes(car.transmission)
        );
      }

      // Filter by price range
      filteredCars = filteredCars.filter(
        (car) => car.price >= priceRange[0] && car.price <= priceRange[1]
      );

      setFilteredData(filteredCars);
    };

    filterData();
  }, [
    data,
    selectedBrands,
    searchInput,
    selectedFuelTypes,
    selectedtransmission,
    priceRange,
  ]);

  const [isRangeWrapperVisible, setIsRangeWrapperVisible] = useState(false);
  const toggleRangeWrapper = () => {
    setIsRangeWrapperVisible(!isRangeWrapperVisible);
  };
  return (
    <>
      <TopNav />
      <br />
      <br />
      <button className="filterbox" onClick={toggleRangeWrapper}>
        filter
      </button>
      <div className={"container"}>
        <div className="range-container">
          <div
            className={`range-wrapper ${isRangeWrapperVisible ? "active" : ""}`}
          >
            <h2 className="range-title">Price Range</h2>
            <p className="range-values">
              <span>{formatAmount(priceRange[0])}</span>
              <span>{formatAmount(priceRange[1])}</span>
            </p>

            <Range
              step={50000}
              min={5000}
              max={5000000}
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
                  value="Kia"
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
                  value="Honda"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Honda</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Maruti"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Maruti</span>
                <span className="brand-count"></span>
              </label>
              <label className="brand-checkbox">
                <input
                  type="checkbox"
                  value="Mahindra"
                  onChange={handleBrandChange}
                />
                <span className="brand-name">Mahindra</span>
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
        </div>
      </div>
      <div className="marketgridmain">
        {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
          paginatedData.map((car, index) => (
            <div key={car._id} className="car-card">
              <div className="markcarimg">
                <img
                  className="car-image"
                  onClick={() => descript(car._id)}
                  src={car.imageUrl[0]}
                  alt="car"
                />

                {car.verifyStatus === "verified" && (
                  <img src={check} className="check-icon" alt="Check" />
                )}
              </div>

              <div className="favorite-icon">
                {iswishListed[car._id] ? (
                  <FaHeart
                    className="heart-icon"
                    onClick={() => handleFavoriteRemove(car._id)}
                  />
                ) : (
                  <AiOutlineHeart
                    className="heart-icon"
                    onClick={() => handleFavoriteClick(car._id)}
                  />
                )}
              </div>

              <div style={{ marginTop: "20px" }}>
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
            </div>
          ))
        ) : (
          <p className="notavalaible">No Cars available.</p>
        )}
      </div>
      <div className="pagination-column-main">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination rounded-pagination"}
          previousLinkClassName={"pagination__link rounded-prev-link"}
          nextLinkClassName={"pagination__link rounded-next-link"}
          disabledClassName={"pagination__link--disabled"}
          // activeClassName={"pagination__link--active"}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          breakLabel={"..."}
          breakClassName={"pagination__link pagination__break"}
          initialPage={0}
          forcePage={currentPage}
          disableInitialCallback={true}
          renderPage={(page) => (
            <div
              className={
                page === currentPage
                  ? "pagination__link pagination__current"
                  : "pagination__link"
              }
              key={page}
              onClick={() => handlePageChange({ selected: page })}
            >
              {page + 1}
            </div>
          )}
          pageClassName={"pagination__link"}
          activeLinkClassName={"pagination__link--active"}
          // previousClassName={"pagination__link pagination__prev"}
          // nextClassName={"pagination__link pagination__next"}
          activeClassName={"pagination__link--active"}
          activeClass={"pagination__link--active"}
          style={{ marginLeft: "50px" }}
        />
      </div>
      <br />
      <br />

      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Marketplace;
