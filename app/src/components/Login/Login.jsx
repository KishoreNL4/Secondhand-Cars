import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../../Repeated/font.css";
import "../../Repeated/font2.css";
import Swal from "sweetalert2";
import axios from "../../axios";
import TopNav from "../Topbar/TopNav";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // const login = async (e) => {
  //   e.preventDefault();

  //   if (email && password) {
  //     try {
  //       const response = await axios.post(
  //         "/login",
  //         { email, password },
  //         { withCredentials: true }
  //       );

  //       if (response.status === 200) {
  //         const rolee = response.data.role;
  //         console.log(response.data);

  //         const Toast = Swal.mixin({
  //           toast: true,
  //           position: "top-end",
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //           didOpen: (toast) => {
  //             toast.addEventListener("mouseenter", Swal.stopTimer);
  //             toast.addEventListener("mouseleave", Swal.resumeTimer);
  //           },
  //         });

  //         Toast.fire({
  //           icon: "success",
  //           title: "Signed in successfully",
  //           showCloseButton: true,
  //         });

  //         switch (rolee) {
  //           case "Customer":
  //             navigate("/");
  //             break;
  //           case "Seller":
  //             navigate("/sidebar");
  //             break;

  //           default:
  //             console.log("Invalid role");
  //             break;
  //         }
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           text: "Invalid credentials",
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error); // Log the error message to the console
  //       Swal.fire({
  //         icon: "error",
  //         text: "An error occurred, please try again",
  //       });
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Please enter name and password",
  //     });
  //   }

  //   // Reset the form
  //   setEmail("");
  //   setPassword("");
  // };

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

          // Navigate to home page after successful login
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

  return (
    <div>
      {/* <TopNav /> */}
      <div className="backcar">
        <br />
        <div className="verbut">
          <button
            className="verifybtt"
            onClick={() => {
              window.open("http://localhost:8080/verification");
            }}
          >
            Verifier
          </button>
        </div>
        <br />
        <br />
        <div className="boxcont">
          <br />
          <div className="closeiconn" onClick={() => navigate("/")}>
            &times;
          </div>
          <img
            className="logo"
            src="https://www.linkpicture.com/q/cars-valley-removebg-preview.png"
            alt=""
            style={{ marginLeft: "60px" }}
          />
          <form className="login-form" action="POST">
            <label
              className="Email-btn"
              htmlFor="email"
              style={{ fontFamily: "Axiforma" }}
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
            <div className="login-link">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer" }}
              >
                Register
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
