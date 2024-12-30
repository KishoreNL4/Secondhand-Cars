import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import { AiOutlineEnvironment, AiOutlineHeart } from "react-icons/ai";
import qr from "./qr.png";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import axios from "../../axios";
import QRCode from "qrcode.react";

import TopNav from "../Topbar/TopNav";
import GooglePayButton from "@google-pay/button-react";
import Notverified from "./Notverified.png";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import Chat from "../Chat/Chat";

const View = () => {
  const navigate = useNavigate();

  const [daata, setDaata] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isAddedtocart, setAddtoCart] = useState({});
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [verifyStatus, setVerifyStatus] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [showQRCodeDetails, setShowQRCodeDetails] = useState(false);

  const [isWishListed, setWishList] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(daata.imageUrl);
  const toggleChat = () => {
    if (isUserLoggedIn) {
      setChatVisible((prevState) => !prevState);
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Login to chat with the owner",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/");
      });
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleclosenotification = () => {
    setChatVisible(false);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const addd = () => {
    console.log(daata);
  };
  const { _id } = useParams();
  const stringId = String(_id);

  console.log(_id, "asadaasdasd");
  const addtowish = async () => {
    try {
      console.log(stringId);
      const response = await axios.get(`/wishlist/${stringId}`);
      console.log(response.data.wishlist);
      setWishList(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    const tokenn = jwt_decode(cookies.user_token);

    if (tokenn.role === "Customer") {
      try {
        console.log(_id);
        const response = await axios.get(`/addtocart/${_id}`);
        console.log(response.data.cart);

        setAddtoCart(response.data.cart);
        navigate("/cart");
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to buy ",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
        setVerifyStatus(response.data.user.verifyStatus);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsUserLoggedIn(!!cookies.user_token); // Double negation to convert to boolean
  }, [cookies]);

  const handleQRCodeClick = () => {
    // setShowQRCodeDetails(true);
    const qrValue = `http://localhost:8080/trace/${_id}`; // Replace with your trace page URL
    window.open(qrValue, "_blank");
  };

  const handleCloseQRCodeDetails = () => {
    setShowQRCodeDetails(false);
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };
  const handleIconClick = () => {
    setIsClicked(!isClicked);
  };
  const handleheartclick = (e) => {
    e.preventDefault();
    handleIconClick();
    addtowish();
  };
  const generateQRCode = () => {
    if (daata.verifyStatus === "verified") {
      const qrValue = `http://localhost:8080/trace/${_id}`; // Replace with your trace page URL
      return (
        <QRCode
          value={qrValue}
          onClick={handleQRCodeClick}
          style={{ cursor: "pointer" }}
        />
      );
    }
    return null;
  };

  const handleContactOwner = () => {
    if (isUserLoggedIn) {
      setShowPopup(true);
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Login to contact the owner",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/");
      });
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <TopNav />
      <div className="attai">
        <div style={{ flexDirection: "column" }}>
          <div className="monimg">
            <img
              className="monster"
              src={
                daata.imageUrl && daata.imageUrl.length > 0
                  ? daata.imageUrl[0]
                  : ""
              }
              alt=""
            />
          </div>
          <div className="slidecar">
            {daata.imageUrl && daata.imageUrl.length > 0 ? (
              daata.imageUrl.map((imageUrl, index) => (
                <img
                  key={index}
                  className="slidecar1"
                  src={imageUrl}
                  alt=""
                  onClick={() => handleImageClick(imageUrl)}
                />
              ))
            ) : (
              <div>No images available</div>
            )}
          </div>
        </div>

        <div className="detailsbox">
          <h2 className="tncs">
            {daata.brand}
            <span className="gap"></span>
            {daata.model}
          </h2>

          <div className="factory">
            <p>
              {daata.km}KM .<span className="gap"></span> {daata.fueltype} .
              <span className="gap"></span>
              {daata.transmission}
            </p>
          </div>
          <div className="idam">
            <div className="land">
              <AiOutlineEnvironment className="signified" />
              <p>{daata.address} .</p> <span className="gape"></span>
              {daata.owner}
            </div>
            <p className="kaasu">
              <h3 className="prikas" style={{ color: "#008080" }}>
                Price:
              </h3>
              ₹ {Number(daata.price).toLocaleString("en-IN")}
            </p>
          </div>

          <p
            className={`toomuch ${
              verifyStatus !== "verified" ? "verification-pending" : ""
            }`}
          >
            {verifyStatus === "verified"
              ? "Scan the QR:"
              : "Verification Pending..."}
          </p>

          <div className="pathukaapu" onClick={() => console.log(qrCodeValue)}>
            {verifyStatus === "verified" ? (
              generateQRCode()
            ) : (
              <img
                className="notverifiedqr"
                src={Notverified}
                alt="Not verified"
              />
            )}
          </div>

          <div className="threebut">
            {/* <button className="purchase" onClick={handleBuyNow}> */}
            <button className="purchase" onClick={toggleChat}>
              Chat
            </button>

            <button className="purchase" onClick={handleContactOwner}>
              CONTACT OWNER
            </button>
            {showPopup && (
              <div className="contact-container">
                <div className="popup-owner">
                  <div className="alignownername">
                    <h3 className="ownername">OwnerName :</h3>
                    <p className="OWNERNAMEali">{daata.ownername}</p>
                  </div>
                  <div className="alignownername">
                    <h3 className="ownername">OwnerNumber :</h3>
                    <p className="OWNERNAME">{daata.ownernumber}</p>
                  </div>
                  <br />
                  <button className="closeowner" onClick={handleClosePopup}>
                    Close
                  </button>
                </div>
              </div>
            )}

            <div
              className={`love ${isClicked ? "clicked" : ""}`}
              onClick={handleheartclick}
            >
              <FiHeart />
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="tommy">
            <p className="whole">Description of the car</p>
            <div className="tharavu">
              <div className="romeio">
                <br />
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                    }}
                  >
                    Model:
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-10px" }}>
                    {daata.model}
                  </span>
                </div>
              </div>

              <div className="romeio">
                <br />
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                    }}
                  >
                    Reg number:
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-10px" }}>
                    {daata.registrationnumber}
                  </span>
                </div>
              </div>
              <div className="romeio">
                <br />
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                    }}
                  >
                    Fuel type:
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-10px" }}>
                    {daata.fueltype}
                  </span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                      marginTop: "10px",
                    }}
                  >
                    Km Driven:
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-10px" }}>
                    {daata.km} KM
                  </span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                      marginTop: "10px",
                    }}
                  >
                    Transmission:{" "}
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-20px" }}>
                    {daata.transmission}
                  </span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                      marginTop: "10px",
                    }}
                  >
                    No. of Owner:{" "}
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-20px" }}>
                    {daata.owner}
                  </span>
                </div>
              </div>
              {/* <div className="romeio">
                <div className="kaaval">
                  <span className="lllbal">Insurance Validity:</span>
                </div>
                <div className="kaaval">
                  <span className="vvalue">Mar2024</span>
                </div>
              </div> */}
              <div className="romeio">
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                      marginTop: "10px",
                    }}
                  >
                    Insurance Validity:
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-30px" }}>
                    {daata.insurancevalidity}
                  </span>
                </div>
              </div>
              <div className="romeio">
                <div className="kaaval">
                  <span
                    className="lllbal"
                    style={{
                      fontWeight: "bold",
                      color: "#008080",
                      marginTop: "10px",
                    }}
                  >
                    Car location:
                  </span>
                </div>
                <div className="kaaval">
                  <span className="vvalue" style={{ marginTop: "-10px" }}>
                    {daata.address}
                  </span>
                </div>
                <br />
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
          <div className="chatvisible">{isChatVisible && <Chat />}</div>
        </div>
      </div>
    </div>
  );
};

export default View;
