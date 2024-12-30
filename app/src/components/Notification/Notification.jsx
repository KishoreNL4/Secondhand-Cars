import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Notification.css"; // Make sure to import your CSS file

function Notification() {
  const [data, setData] = useState([]);
  const [wishList, setwishList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/allCars");
      const cars = response.data.cars;

      const currentDate = new Date();
      const fiveDaysFromNow = new Date();
      fiveDaysFromNow.setDate(currentDate.getDate() + 5);

      const expiringCars = cars.filter((car) => {
        const insuranceValidityDate = new Date(car.insurancevalidity);

        console.log(
          `${car.brand} - Insurance Validity: ${insuranceValidityDate}`
        );

        return insuranceValidityDate <= fiveDaysFromNow;
      });

      setData(expiringCars);
      // setwishList(Array(expiringCars.length).fill(true));
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllNotifications = () => {
    setwishList(Array(data.length).fill(false));
  };

  return (
    <div>
      <div className="notify">
        <div className="notify1">
          {data.map((car, index) => (
            <div key={car.id} className="notification-item">
              {wishList[index] ? (
                <div className="notification-message">
                  Your Insurance validity of {car.brand} is going to expire in 5
                  days. Please renew it.
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <button className="clearall" onClick={clearAllNotifications}>
          Clear all
        </button>
      </div>
    </div>
  );
}

export default Notification;
