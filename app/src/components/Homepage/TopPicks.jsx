import React, { useRef, useState, useEffect } from "react";
import axios from "../../axios.js";
import "./TopPicks.css";
import { useNavigate } from "react-router";

const TopPicks = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const containerRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await axios.get("/allCars");
        const allCars = responsee.data.cars;

        const filteredPets = allCars.filter((cars) => cars.imageUrl !== "");

        setDetails(filteredPets);
        console.log(filteredPets, "sdjfjdsfkjddanbsdafbdsj,fkjdsfkndas ");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const scrollRight = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft + containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft - containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="top-picks-sectioncars">
        <br />
        <br />
        <h2 style={{ color: "#008080" }}>Added to Market</h2>
        <div className="top-picks-wrappercars" ref={containerRef}>
          <div className="top-picks-containercars">
            {details.map((image, index) => (
              <div className="cardca">
                <div className="picim">
                  <img
                    onClick={() => {
                      navigate(`/description/${details[index]?._id}`);
                    }}
                    className="picimg1"
                    src={image.imageUrl[0]}
                    alt={`Car ${index + 1}`}
                  />
                </div>

                <button
                  className="piclbut"
                  onClick={() => {
                    navigate(`/description/${details[index]?._id}`);
                  }}
                >
                  View
                </button>
                <h3
                  style={{
                    color: "rgb(0, 36, 65)",
                    display: "flex",
                    alignItems: "left",
                  }}
                >
                  {image.brand} {image.model}
                </h3>

                <p
                  className="carrr-price"
                  style={{
                    // fontWeight: "bold",
                    fontSize: "16px",
                    // fontFamily: "poppins",
                    color: "black",
                    marginTop: "-5px",
                    display: "flex",
                    alignItems: "left",
                  }}
                >
                  ₹ {Number(image.price).toLocaleString("en-IN")}
                </p>
                <button
                  className="topbut"
                  onClick={() => {
                    navigate(`/description/${details[index]?._id}`);
                  }}
                >
                  <span>view</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}

        <div className="carousel-arrows">
          <span className="arrow-left" onClick={scrollLeft}>
            &#8249;
          </span>
          <span className="arrow-right" onClick={scrollRight}>
            &#8250;
          </span>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
