import React, { useEffect, useState } from "react";

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
import { forwardDocument, getAllUsers } from "../../utils";
import { LoadingGear } from "../../assets/svg";

function Request_Dialog({
  action,
  openRequest,
  closeRequest,
  status,
  document_Name,
  document_id,
  getTableDocuments,
  userProfile,
}) {
  const [users, setUsers] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [openOptions, setOpenOptions] = useState("");
  const [actionDetails, setActionDetails] = useState({
    document_Name: document_Name,
    document_id: "document_id",
    comment: "",
    action: "",
    forward_To: "",
    status: "",
    forward_To_Name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Please wait...");
    setSubmit(true);
    if (actionDetails.forward_To === "") {
      toast.dismiss();
      toast.error(`Select a user.`, { position: "bottom-center" });
    } else {
      const res = await forwardDocument({
        document_Name: actionDetails.document_Name,
        document_id: actionDetails.document_id,
        comment: actionDetails.comment,
        action: actionDetails.action,
        forward_To: actionDetails.forward_To,
        status: actionDetails.status,
        forwarded_By: userProfile.user_id,
        forwarded_By_Name: userProfile.full_Name,
        forward_To_Name: actionDetails.forward_To_Name,
      });

      if (res?.status === 200) {
        toast.dismiss();
        toast.success("Added document successfully.", {
          position: "bottom-center",
        });
      } else {
        toast.dismiss();
        toast.error(`${res?.errorMessage}`, { position: "bottom-center" });
      }
      getTableDocuments();
      handleCancel();
    }
    setSubmit(false);
  };

  const handleCancel = () => {
    setActionDetails({
      document_Name: "",
      document_id: "",
      comment: "",
      action: "",
      forward_To: "",
      status: "",
    });
    closeRequest({ ...closeRequest, show: false });
  };

  const showOptions = (input) => {
    setTimeout(() => {
      setOpenOptions(input);
    }, 160);
  };

  const closeOptions = () => {
    setTimeout(() => {
      setOpenOptions("");
    }, 150);
  };

  const getUserOptions = async () => {
    const res = await getAllUsers();
    if (res?.status === 200) {
      setUsers(res.data?.users);
    } else toast.error("An error occured while fetching data.");
  };

  useEffect(() => {
    getUserOptions();
  }, []);

  useEffect(() => {
    setActionDetails({
      ...actionDetails,
      action: action,
      document_Name: document_Name,
      document_id: document_id,
      status:
        action === "Forward"
          ? status
          : action === "Approve"
          ? "Approved"
          : action === "Reject" && "Rejected",
    });
  }, [action]);

  const handleCheckBox = (action) => {
    if (actionDetails.forward_To.includes(action)) {
      setActionDetails({ ...actionDetails, forward_To: "" });
    } else {
      setActionDetails({
        ...actionDetails,
        forward_To: `${action} ${userProfile.user_id}`,
      });
    }
  };

  return (
    <section id="Request_Dialog" className="Request_Dialog">
      <Dialog
        className="Dialog_Container"
        fullWidth
        maxWidth={"xs"}
        open={openRequest}
        onClose={() => handleCancel()}
      >
        <Paper sx={{ backgroundColor: "#F4F4F4" }}>
          <DialogTitle>
            <div className="Dialog_Top">
              <span className="Dialog_Title">{action} Document</span>
              <div className="Dialog_Close" onClick={() => handleCancel()}>
                <IoIcons.IoMdClose size={"30px"} />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <form id="request_Form" onSubmit={handleSubmit}>
              <div className="Inputs">
                {/* Other Inputs */}
                <div className="Input_Group">
                  <span className="Input_Label">Comment/Note</span>
                  <input
                    className="Input"
                    type="text"
                    placeholder="Comment/Note"
                    value={actionDetails.comment || ""}
                    onChange={(e) =>
                      setActionDetails({
                        ...actionDetails,
                        comment: e.target.value,
                      })
                    }
                    maxLength={1000}
                    disabled={submit && submit === true}
                  />
                </div>

                {/* Other Inputs */}
                <div className="Input_Group">
                  <span className="Input_Label">
                    Forward To <span className="required">*</span>
                  </span>
                  <input
                    className="Input"
                    type="text"
                    placeholder="Forward To"
                    value={
                      users.find(
                        (user) => user.user_id === actionDetails.forward_To
                      )?.full_Name || ""
                    }
                    onFocus={() => showOptions("Forward To")}
                    onBlur={() => closeOptions()}
                    readOnly
                    required={actionDetails.forward_To === ""}
                    disabled={submit && submit === true}
                  />
                  <div
                    className={
                      openOptions === "Forward To" ? "Options show" : "Options"
                    }
                  >
                    <div
                      className="Option"
                      onClick={() =>
                        setActionDetails({
                          ...actionDetails,
                          forward_To: "",
                          forward_To_Name: "",
                        })
                      }
                    >
                      <p>Clear</p>
                    </div>
                    {users.filter(
                      (user) =>
                        user.user_id !== userProfile.user_id &&
                        user.role !== "Admin"
                    ).length !== 0 ? (
                      <React.Fragment>
                        {users
                          .filter(
                            (user) =>
                              user.user_id !== userProfile.user_id &&
                              user.role !== "Admin"
                          )
                          .map((user) => (
                            <div
                              className="Option"
                              key={user.user_id}
                              onClick={() =>
                                setActionDetails({
                                  ...actionDetails,
                                  forward_To: user.user_id,
                                  forward_To_Name: user.full_Name,
                                })
                              }
                            >
                              <p>{`(${user.role}) ${user.full_Name}`}</p>
                            </div>
                          ))}
                      </React.Fragment>
                    ) : (
                      <div className="Option">
                        <p>No User Found</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="divider_group">
                  <span className="divider"></span>
                  <span>or</span>
                  <span className="divider"></span>
                </div>

                <div className="Checkboxes">
                  <div className="Label">
                    <span>
                      Forward To <span className="required">*</span>
                    </span>
                  </div>
                  <div className="checkbox-wrapper-46">
                    <input
                      disabled={submit && submit === true}
                      className="inp-cbx"
                      id="cbx-46"
                      type="checkbox"
                      onChange={() => handleCheckBox("All")}
                      checked={actionDetails.forward_To.includes("All")}
                    />
                    <label className="cbx" htmlFor="cbx-46">
                      <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <span className="label">All Users</span>
                    </label>
                  </div>
                  <div className="checkbox-wrapper-46">
                    <input
                      disabled={submit && submit === true}
                      className="inp-cbx"
                      id="cbx-47"
                      type="checkbox"
                      onChange={() => handleCheckBox("Faculty")}
                      checked={actionDetails.forward_To.includes("Faculty")}
                    />
                    <label className="cbx" htmlFor="cbx-47">
                      <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <span className="label">All Faculty</span>
                    </label>
                  </div>
                  <div className="checkbox-wrapper-46">
                    <input
                      disabled={submit && submit === true}
                      className="inp-cbx"
                      id="cbx-48"
                      type="checkbox"
                      onChange={() => handleCheckBox("Clerk")}
                      checked={actionDetails.forward_To.includes("Clerk")}
                    />
                    <label className="cbx" htmlFor="cbx-48">
                      <span>
                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <span className="label">All Clerks</span>
                    </label>
                  </div>
                </div>
              </div>
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
                form="request_Form"
                className="Dialog_Submit"
              >
                {submit && submit === true ? (
                  <LoadingGear width="40px" height="40px" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </DialogActions>
        </Paper>
      </Dialog>
    </section>
  );
}

export default Request_Dialog;
