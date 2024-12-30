import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./Profile.css";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import TopNav from "../Topbar/TopNav";

function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const token = jwtDecode(cookies.user_token);
  console.log(token);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [email, setEmail] = useState(token.email);
  const [mobileNumber, setMobileNumber] = useState(token.phoneNumber);
  const [name, SetName] = useState(token.name);
  const [role, setRole] = useState(token.role);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Perform save logic or API request here
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const logout = () => {
    removeCookie("user_token", { path: "/" });
    navigate("/", { replace: true });
  };

  const handleCloseIconClick = () => {
    // Use navigate(-1) to go back to the previous page
    navigate(-1);
  };

  return (
    <div className="patternimage">
      <div className="Profilediv">
        <TopNav />
        <div className="Profilediv1">
          <div className="LeftSection">
            <div className="CenterContent">
              <div className="profile-img">
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                    alt=""
                  />
                )}
                <div
                  className="file btn btn-lg btn-primary"
                  style={{
                    marginLeft: "0px",
                    width: "130px",
                    height: "25px",
                    color: "white",
                  }}
                >
                  Change Photo
                  <input type="file" name="file" onChange={handleImageChange} />
                </div>
                <br />
              </div>
              <br />
              <br />
              <div className="name-field">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="nameholdername">Name:</div>
                  {""}
                  <div className="profile-name" style={{ marginLeft: "5px" }}>
                    {name}
                  </div>
                </div>
                <br />

                <div style={{ display: "flex", flexDirection: "row" }}>
                  {/* <div className="nameholder">Role:</div>
                  {""}
                  <div className="profile-name" style={{ marginLeft: "5px" }}>
                    {role}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="RightSection">
            <div className="closeicon" onClick={handleCloseIconClick}>
              {/* <div className="closeicon" onClick={handlecloseIconClick}> */}
              &times;
            </div>
            <div className="profile-f1">
              <h4 className="nameholderinfo" style={{ marginTop: "40px" }}>
                Information
              </h4>
            </div>
            <hr className="line" />
            <div className="info-container">
              <div className="info-item">
                <h5 className="nameholder" style={{ marginLeft: "-75px" }}>
                  Email:
                </h5>
                {isEditMode ? (
                  <input
                    type="text"
                    className="email-input"
                    value={email}
                    onChange={handleEmailChange}
                  />
                ) : (
                  <span className="email-input">{email}</span>
                )}
              </div>
              <div className="info-item">
                <h5 className="nameholdermob" style={{ marginLeft: "-70px" }}>
                  Mobile Number:
                </h5>
                {isEditMode ? (
                  <input
                    type="text"
                    className="mobile-input"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                  />
                ) : (
                  <span className="mobile-input">{mobileNumber}</span>
                )}
              </div>
            </div>
            <div className="edit-bbutton">
              {isEditMode ? (
                <button className="save-button" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <FaEdit className="edit-icon" onClick={handleEditClick} />
              )}
            </div>
            <div className="logoutt-button-container">
              <button className="logoutt-button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
