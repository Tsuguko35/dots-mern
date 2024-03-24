import React, { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import toast from "react-hot-toast";

import "../../styles/request_dialog.css";

import * as IoIcons from "react-icons/io";
import { RegisterStaff, isEmailRegistered } from "../../context/action";
import { LoadingGear } from "../../assets/svg";

function Create_Staff_Dialog({ openCreateStaff, closeCreateStaff }) {
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [accountDetails, setAccountDetails] = useState({
    role: "Clerk",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setError({
      isError: false,
      errorMessage: "",
    });

    if (accountDetails.password !== accountDetails.confirmPassword) {
      setError({ isError: true, errorMessage: "Passwords do not match" });
    } else if (accountDetails.password.length < 6) {
      setError({
        isError: true,
        errorMessage: "Password must be 6 to 30 characters long",
      });
    } else if (!accountDetails.email.endsWith("@bulsu.edu.ph")) {
      setError({ isError: true, errorMessage: "Please use a BulSU email" });
    } else {
      const isEmailRegisteredRes = await isEmailRegistered({
        email: accountDetails.email,
      });
      if (isEmailRegisteredRes) {
        if (isEmailRegisteredRes.status === 200) {
          const data = isEmailRegisteredRes.data;
          setError({ isError: false, errorMessage: "" });

          if (data.exist === true) {
            setError({
              isError: true,
              errorMessage: "This email is already registered in the system",
            });
          } else if (data.exist === false) {
            const res = await RegisterStaff({
              email: accountDetails.email,
              password: accountDetails.password,
              role: accountDetails.role,
            });

            if (res?.status === 200) {
              toast.success("Staff account created.");
              closeCreateStaff(false);
            } else {
              setError({ isError: true, errorMessage: res?.errorMessage });
            }
          }
        } else if (isEmailRegisteredRes.status === 400) {
          toast.error("An unexpected error has occured.");
        }
      }
    }

    setSubmit(false);
  };

  const handleCancel = () => {
    setAccountDetails({
      role: "Clerk",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError({
      isError: false,
      errorMessage: "",
    });
    setSubmit(false);
    closeCreateStaff(false);
  };

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
  return (
    <section id="Create_Staff_Dialog" className="Create_Staff_Dialog">
      <Dialog
        className="Dialog_Container"
        fullWidth
        maxWidth={"xs"}
        open={openCreateStaff}
        onClose={() => handleCancel()}
      >
        <Paper sx={{ backgroundColor: "#F4F4F4" }}>
          <DialogTitle>
            <div className="Dialog_Top">
              <span className="Dialog_Title">Create Staff Account</span>
              <div className="Dialog_Close" onClick={() => handleCancel()}>
                <IoIcons.IoMdClose size={"30px"} />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <form id="createStaff_Form" onSubmit={handleSubmit}>
              <div className="Inputs">
                {/* CheckBoxes */}
                <div className="Radio_Container">
                  <div className="radio-input">
                    <label>
                      <input
                        type="radio"
                        id="value-1"
                        name="value-radio"
                        onClick={() =>
                          setAccountDetails({
                            ...accountDetails,
                            role: "Secretary",
                          })
                        }
                        checked={accountDetails.role === "Secretary"}
                        value="Secretary"
                        disabled={submit}
                      />
                      <span>Secretary</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        id="value-2"
                        name="value-radio"
                        onClick={() =>
                          setAccountDetails({
                            ...accountDetails,
                            role: "Clerk",
                          })
                        }
                        checked={accountDetails.role === "Clerk"}
                        value="Clerk"
                        disabled={submit}
                      />
                      <span>Clerk</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        id="value-3"
                        name="value-radio"
                        onClick={() =>
                          setAccountDetails({ ...accountDetails, role: "SA" })
                        }
                        checked={accountDetails.role === "SA"}
                        value="SA"
                        disabled={submit}
                      />
                      <span>Student Assistant</span>
                    </label>
                    <span className="selection"></span>
                  </div>
                </div>

                {/* Other Inputs */}
                <div className="Input_Group">
                  <span className="Input_Label">
                    BulSU Email<span className="required">*</span>
                  </span>
                  <input
                    className={!error.isError ? "Input" : "Input error"}
                    type="text"
                    placeholder="BulSU Email"
                    value={accountDetails.email}
                    onChange={(e) =>
                      setAccountDetails({
                        ...accountDetails,
                        email: e.target.value,
                      })
                    }
                    required
                    maxLength={100}
                    disabled={submit}
                  />
                </div>

                {/* Other Inputs */}
                <div className="Input_Group staff">
                  <span className="Input_Label">
                    Temporary Password<span className="required">*</span>
                  </span>
                  <div
                    className={
                      !error.isError
                        ? "Custom_Password"
                        : "Custom_Password error"
                    }
                  >
                    <input
                      disabled={submit}
                      required
                      maxLength={30}
                      className="Input"
                      type={
                        showPassword.some(
                          (showPass) => showPass.for === "Password"
                        )
                          ? "text"
                          : "password"
                      }
                      placeholder="Temporary Password"
                      value={accountDetails.password}
                      onChange={(e) =>
                        setAccountDetails({
                          ...accountDetails,
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

                {/* Other Inputs */}
                <div className="Input_Group staff">
                  <span className="Input_Label">
                    Confirm Temporary Password
                    <span className="required">*</span>
                  </span>
                  <div
                    className={
                      !error.isError
                        ? "Custom_Password"
                        : "Custom_Password error"
                    }
                  >
                    <input
                      disabled={submit}
                      required
                      maxLength={30}
                      className="Input"
                      type={
                        showPassword.some(
                          (showPass) => showPass.for === "Confirm Password"
                        )
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm Temporary Password"
                      value={accountDetails.confirmPassword}
                      onChange={(e) =>
                        setAccountDetails({
                          ...accountDetails,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <div
                      className="Icon"
                      onClick={() =>
                        handleClickShowPassword("Confirm Password")
                      }
                    >
                      {showPassword.some(
                        (showPass) => showPass.for === "Confirm Password"
                      ) ? (
                        <IoIcons.IoMdEyeOff size={"25px"} />
                      ) : (
                        <IoIcons.IoMdEye size={"25px"} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {error.isError && (
                <div className="errorMessage">
                  <p>{error.errorMessage}</p>
                </div>
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <div className="Dialog_Actions">
              <button
                className="Dialog_Cancel"
                autoFocus
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="createStaff_Form"
                className="Dialog_Submit"
              >
                {submit ? <LoadingGear width="40px" height="40px" /> : "Create"}
              </button>
            </div>
          </DialogActions>
        </Paper>
      </Dialog>
    </section>
  );
}

export default Create_Staff_Dialog;
