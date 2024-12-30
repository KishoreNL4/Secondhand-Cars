import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import "../../Repeated/font.css";
import "../../Repeated/font2.css";
import Swal from "sweetalert2";
import axios from "../../axios";

const Register = () => {
  const history = useNavigate();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [role, setRole] = useState("Select User");
  // const [loading, setLoading] = useState("")
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

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
      console.log("hiighji");
      console.log(response.data);

      if (response.data.message === "success") {
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
          confirmButtonText: "OK",
          cancelButtonText: "Close",
          showCancelButton: true,
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
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

  const verifyclick = () => {
    window.open("http://localhost:8080/verification", "_blank");
  };

  return (
    <div>
      <div className="backcar">
        <br />
        <br />
        <div className="verbut">
          <button className="verifybtt" onClick={verifyclick}>
            Verifier
          </button>
        </div>
        <br />
        <div className="boxcont1">
          <br />
          <div className="closeiconx" onClick={() => navigate("/")}>
            &times;
          </div>
          <img
            className="logo"
            src="https://www.linkpicture.com/q/cars-valley-removebg-preview.png"
            alt=""
            style={{ marginLeft: "60px" }}
          />
          <form
            className="login-form"
            action="POST"
            style={{ marginBottom: "20px" }}
          >
            <label
              className="Email-btn"
              htmlFor="username"
              style={{ fontFamily: "Axiforma" }}
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

            <label
              className="Email-btn"
              htmlFor="phone"
              style={{ fontFamily: "Axiforma" }}
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

            <label
              className="Email-btn"
              htmlFor="email"
              style={{ fontFamily: "Axiforma" }}
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

            <br />
            <div className="login-link">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Login
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
      {/* <div className="copy" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Cars Valley
      </div> */}
    </div>
  );
};

export default Register;
