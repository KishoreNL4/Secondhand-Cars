import React, { useEffect } from "react";

import Slider from "./Slider";
import Collection from "./Collection";
import TopPicks from "./TopPicks";
import Firsttab from "./Firsttab";
import Footer from "../Footer/Footer";
import TopNav from "../Topbar/TopNav";
import axios from "../../axios.js";
import GridElement from "./GridElement";
import SellCar from "./SellCar";

function Home() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/allCars");
  //       const carsData = response.data.cars;
  //       console.log(carsData);
  //       carsData.forEach((cars) => {
  //         console.log(cars.brand);
  //       });

  //       const responsee = await axios.get("/images");
  //       const imagesData = responsee.data;
  //       imagesData.forEach((i) => {
  //         console.log(i._id);
  //       });

  //       // Match IDs and make the POST request
  //       const matchingIDs = carsData
  //         .map((cars) => cars._id)
  //         .filter((id) => imagesData.find((image) => image._id == id));

  //       console.log(matchingIDs);

  //       matchingIDs.forEach(async (id) => {
  //         const matchingImage = imagesData.find((image) => image._id == id);
  //         try {
  //           await axios.post("/imageUrl", {
  //             imageUrl: matchingImage.imageUrl,
  //             ids: [id],
  //           });
  //           console.log("Image URL posted for ID:", id);
  //         } catch (error) {
  //           console.log("Error posting image URL for ID:", id, error);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/allCars");
        const carsData = response.data.cars;

        const responsee = await axios.get("/images");
        const imagesData = responsee.data;

        // Group image URLs by their IDs
        const imageUrlsByCarId = {};
        imagesData.forEach((image) => {
          if (!imageUrlsByCarId[image._id]) {
            imageUrlsByCarId[image._id] = [image.imageUrl];
          } else {
            imageUrlsByCarId[image._id].push(image.imageUrl);
          }
        });

        // Match IDs and make the POST request
        carsData.forEach(async (car) => {
          const id = car._id;
          const imageUrls = imageUrlsByCarId[id];

          if (imageUrls) {
            try {
              await axios.post("/imageUrl", {
                imageUrl: imageUrls,
                ids: [id],
              });

              console.log("Image URLs posted for ID:", id);
            } catch (error) {
              console.log("Error posting image URLs for ID:", id, error);
            }
          } else {
            console.log("No image URLs found for ID:", id);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bground">
      {/* <Topbar /> */}
      <TopNav />
      <br />
      <Firsttab />

      <br />
      <div style={{ width: "900px" }}>
        <GridElement />
      </div>
      <br />
      <br />
      <br />

      <TopPicks />

      <br />
      <br />
      <br />
      <div style={{ margin: "auto", marginLeft: "10px" }}>
        <Collection />
      </div>
      <br />
      <div style={{ marginLeft: "30px" }}>
        <SellCar />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
