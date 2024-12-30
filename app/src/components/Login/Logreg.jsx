import React, { useState } from "react";
import "./Logreg.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../axios";
import Carlogo from "./cars-valley.png"; // Import the CSS file for styling

function Logreg() {
  const navigate = useNavigate();
  const history = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const login = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios.post(
          "/login",
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log(response.data);

          // Reload the page after successful login
          setTimeout(() => {
            window.location.reload();
          }, 500);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
            showCloseButton: true,
          });

          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            text: "Invalid credentials",
          });
        }
      } catch (error) {
        console.log(error); // Log the error message to the console
        Swal.fire({
          icon: "error",
          text: "An error occurred, please try again",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter name and password",
      });
    }

    // Reset the form
    setEmail("");
    setPassword("");
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/register`, {
        username,
        email,
        password,
        phoneNumber,
        // role,
      });
      if (response.status === 200) {
        console.log(response.data);

        // Reload the page after successful login
        setTimeout(() => {
          window.location.reload();
        }, 500);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          title: "User Registered",
          icon: "success",

          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setActiveTab("login");
            history.push("/login");
          }
        });
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      // setRole("");
    } catch (error) {
      Toast.fire({
        text: "Please add the details correctly",
        icon: "error",
        cancelButtonText: "Close",
        showCancelButton: true,
        showConfirmButton: false,
      });
      console.log(error);
    }
  };

  return (
    <div className="logreg-container">
      <img
        className="logo"
        src={Carlogo}
        alt=""
        style={{ marginLeft: "35px" }}
      />
      <br />
      <div className="button-switch">
        <button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => handleTabClick("login")}
        >
          Login
        </button>
        <button
          className={activeTab === "register" ? "active" : ""}
          onClick={() => handleTabClick("register")}
        >
          Register
        </button>
      </div>
      <br />

      {activeTab === "login" && (
        <form className="login-form" action="POST">
          <label
            className="Email-btn"
            htmlFor="email"
            style={{ fontFamily: "Axiforma", marginTop: "5px" }}
            // style={{ marginTop: "5px" }}
          >
            Email or Username
          </label>
          <input
            required
            className="wn"
            // type="email"
            placeholder="Your email"
            // id="email"
            // name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label
            className="Email-btn"
            htmlFor="password"
            style={{ fontFamily: "Axiforma" }}
          >
            Password
          </label>
          <input
            required
            className="wn"
            type="password"
            placeholder="*********"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btt" type="submit" onClick={login}>
            {/* <button
              className="btt"
              type="submit"
              onClick={() => navigate("/sidebar")}
            > */}
            Log In
          </button>
          <br />
          {/* <div className="login-link">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer" }}
            >
              Register
            </button>
          </div>
          <br /> */}
        </form>
      )}

      {activeTab === "register" && (
        <form
          className="login-form"
          action="POST"
          style={{ marginBottom: "20px" }}
        >
          <label
            className="Email-btn"
            htmlFor="username"
            style={{ fontFamily: "Axiforma", marginTop: "5px" }}
          >
            Username
          </label>
          <input
            required
            className="wn"
            type="text"
            placeholder="Your username"
            id="username"
            name="username"
            style={{ fontFamily: "Helvetica Now" }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />

          <label
            className="Email-btn"
            htmlFor="phone"
            style={{ fontFamily: "Axiforma", marginTop: "-5px" }}
          >
            Phone Number
          </label>
          <input
            required
            className="wn"
            type="tel"
            placeholder="Your phone number"
            id="phone"
            name="phone"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            style={{ fontFamily: "Helvetica Now" }}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <br />

          <label
            className="Email-btn"
            htmlFor="email"
            style={{ fontFamily: "Axiforma", marginTop: "-5px" }}
          >
            Email
          </label>
          <input
            required
            className="wn"
            type="email"
            placeholder="Your email"
            id="email"
            name="email"
            style={{ fontFamily: "Helvetica Now" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />

          <label
            className="Email-btn"
            htmlFor="password"
            style={{ fontFamily: "Axiforma", marginTop: "-5px" }}
          >
            Password
          </label>
          <input
            required
            className="wn"
            type="password"
            placeholder="*********"
            id="password"
            name="password"
            style={{ fontFamily: "Helvetica Now" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/* <label
              className="Email-btn"
              htmlFor="userType"
              style={{ fontFamily: "Axiforma" }}
            >
              Role
            </label>
            <select
              className="seluse"
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ fontFamily: "Helvetica Now" }}
            >
              <option disabled value="Select User">
                Select User
              </option>
              <option value="Customer">Customer</option>
              <option value="Seller">Seller</option>
            </select> */}
          <br />

          <button
            className="btt"
            type="submit"
            style={{ fontFamily: "Axiforma" }}
            onClick={register}
          >
            Register
          </button>

          {/* <div className="login-link">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Login
            </button>
          </div>
          <br /> */}
        </form>
      )}
    </div>
  );
}

export default Logreg;
