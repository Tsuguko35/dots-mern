import React, { useContext, useEffect, useState } from "react";

import "../../styles/adminlogin.css";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { LoadingGear } from "../../assets/svg";

import * as IoIcons from "react-icons/io";
import { NotificationContext } from "../../context/context";
import { logInAdmin, validateUser } from "../../context/action";
import Swal from "sweetalert2";

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState({ isError: false, errorMessage: "" });
  const [submit, setSubmit] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const { setUser } = useContext(NotificationContext);
  // Hide Show Password
  const [showPassword, setShowPassword] = useState([{ show: false, for: "" }]);

  const handleClickShowPassword = (props) => {
    if (showPassword.some((showPass) => showPass.for === props)) {
      setShowPassword((prev) =>
        prev.filter((showPass) => showPass.for !== props)
      );
    } else {
      setShowPassword((prev) => [...prev, { show: true, for: props }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true);

    const res = await logInAdmin({
      username: loginCredentials.username,
      password: loginCredentials.password,
    });

    if (res?.status === 200) {
      setSubmit(false);
      // If user is Active
      if (res.data?.role === "Admin") {
        Swal.fire({
          icon: "success",
          text: "Logged In Successfully.",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          setUser(res?.data);
          localStorage.removeItem("timerTime");
          localStorage.removeItem("loginAttemptCount");
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("dotsUser", res.data?.token);
          window.localStorage.setItem("profile", JSON.stringify(res.data));
          navigate("/admin/userslist");
        });
      } else {
        setError({
          isError: true,
          errorMessage: "This account is not an admin.",
        });
      }
    }

    if (res?.status === 400) {
      setSubmit(false);
      setError({ isError: true, errorMessage: res.errorMessage });
      setLoginCredentials({ ...loginCredentials, password: "" });
    }
  };

  useEffect(() => {
    async function validate() {
      const isLoggedIn = window.localStorage.getItem("isLoggedIn");
      const token = window.localStorage.getItem("dotsUser");
      const user = JSON.parse(window.localStorage.getItem("profile"));
      Swal.fire({
        title: "Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: async () => {
          Swal.showLoading();
          if (isLoggedIn) {
            const res = await validateUser({ token });
            if (res?.status === 200) {
              Swal.fire({
                icon: "success",
                text: "Logged In Successfully.",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1000,
              }).then(() => {
                //Clear login Attempts
                localStorage.removeItem("timerTime");
                localStorage.removeItem("loginAttemptCount");

                setUser(res?.data);
                document.cookie = `token=${token}; path=/`;
                if (user.role !== "Admin") {
                  navigate("/Dashboard");
                } else {
                  navigate("/admin/userslist");
                }
              });
            } else {
              window.localStorage.removeItem("isLoggedIn");
              window.localStorage.removeItem("dotsUser");
              window.localStorage.removeItem("profile");
              window.localStorage.removeItem("username");
              window.localStorage.removeItem("email");
              window.localStorage.removeItem("profilePic");
              Swal.close();
              document.cookie = "token=; Max-Age=0; secure";
            }
          } else {
            Swal.close();
            document.cookie = "token=; Max-Age=0; secure";
          }
        },
      });
    }

    validate();
  }, []);

  return (
    <section id="Admin_Login" className="Admin_Login">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <span className="Label">Admin Login</span>
          <div className="Input_Group">
            <span className="Input_Label">Username</span>
            <div
              className={!error.isError ? "Custom_Email" : "Custom_Email error"}
            >
              <input
                className="Input"
                type="text"
                disabled={submit}
                autoComplete="true"
                placeholder="Username"
                value={loginCredentials.username}
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    username: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="Input_Group">
            <span className="Input_Label">Password</span>
            <div
              className={
                !error.isError ? "Custom_Password" : "Custom_Password error"
              }
            >
              <input
                className="Input"
                type={
                  showPassword.some((showPass) => showPass.for === "Password")
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                disabled={submit}
                value={loginCredentials.password}
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    password: e.target.value,
                  })
                }
              />
              <div
                className="Icon"
                onClick={() => handleClickShowPassword("Password")}
              >
                {showPassword.some(
                  (showPass) => showPass.for === "Password"
                ) ? (
                  <IoIcons.IoMdEyeOff size={"25px"} />
                ) : (
                  <IoIcons.IoMdEye size={"25px"} />
                )}
              </div>
            </div>
          </div>

          {error.isError && (
            <div className="errorMessage">
              <p>{error.errorMessage}</p>
            </div>
          )}

          <button type="submit" className="Submit_Button">
            {submit ? <LoadingGear width="25px" height="25px" /> : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
