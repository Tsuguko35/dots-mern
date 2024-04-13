import React, { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";

import "../../styles/request_dialog.css";

import * as IoIcons from "react-icons/io";

import { LoadingGear } from "../../assets/svg";
import { changeRole, checkFileType, uploadTemplates } from "../../utils";
import Swal from "sweetalert2";

function Change_Role_Dialog({
  openChangeRole,
  closeChangeRole,
  getUsers,
  userID,
  role,
  username,
}) {
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [userRole, setUserRole] = useState(role || "");
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    toast.loading("Please wait...");
    setError({
      isError: false,
      errorMessage: "",
    });

    if (userRole === role) {
      setError({
        isError: true,
        errorMessage: "Must be a diferent role.",
      });
      toast.dismiss();
      setSubmit(false);
    } else {
      const res = await changeRole({
        user_id: userID,
        role: userRole,
      });
      if (res?.status === 200) {
        toast.dismiss();
        toast.success("Role Changed");
        setSubmit(false);
        closeChangeRole(false);
      } else {
        toast.dismiss();
        toast.error(res?.errorMessage);
      }

      getUsers();
      setSubmit(false);
    }
  };

  const handleCancel = () => {
    if (userRole !== role) {
      Swal.fire({
        icon: "warning",
        iconColor: "#FF8911",
        text: "Warning! Closing will delete the data you inputted. Continue?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, close",
        cancelButtonText: "No, cancel",
        confirmButtonColor: "#FF8911",
        cancelButtonColor: "#3A3535",
      }).then((result) => {
        if (result.isConfirmed) {
          setError({
            isError: false,
            errorMessage: "",
          });
          setSubmit(false);
          closeChangeRole(false);
        } else {
          Swal.close();
        }
      });
    } else {
      setError({
        isError: false,
        errorMessage: "",
      });
      setSubmit(false);
      closeChangeRole(false);
    }
  };

  return (
    <section id="Add_Template_Dialog" className="Add_Template_Dialog">
      <Dialog
        className="Dialog_Container"
        fullWidth
        maxWidth={"xs"}
        open={openChangeRole}
        onClose={() => handleCancel()}
      >
        <Paper sx={{ backgroundColor: "#F4F4F4" }}>
          <DialogTitle>
            <div className="Dialog_Top">
              <span className="Dialog_Title">Change {username}'s role</span>
              <div className="Dialog_Close" onClick={() => handleCancel()}>
                <IoIcons.IoMdClose size={"30px"} />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <form id="changeRole_Form" onSubmit={handleSubmit}>
              {/* Role Select */}
              <div className="RoleSelect_Container">
                <select
                  name="roleSelect"
                  className="RoleSelect"
                  value={userRole || ""}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="" className="roleOption" disabled>
                    Select Role
                  </option>
                  <option value="Dean" className="roleOption">
                    Dean
                  </option>
                  <option value="Secretary" className="roleOption">
                    Secretary
                  </option>
                  <option value="Clerk" className="roleOption">
                    Clerk
                  </option>
                  <option value="Faculty" className="roleOption">
                    Faculty
                  </option>
                  <option value="SA" className="roleOption">
                    Student Assistant
                  </option>
                </select>
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
                form="changeRole_Form"
                className="Dialog_Submit"
              >
                {submit ? <LoadingGear width="40px" height="40px" /> : "Change"}
              </button>
            </div>
          </DialogActions>
        </Paper>
      </Dialog>
    </section>
  );
}

export default Change_Role_Dialog;
