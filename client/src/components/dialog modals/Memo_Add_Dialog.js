import React, { useContext, useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import toast from "react-hot-toast";

import "../../styles/add_edit_dialog.css";

import * as IoIcons from "react-icons/io";
import * as SlIcons from "react-icons/sl";
import * as FaIcons from "react-icons/fa";

import { ReactComponent as PDF } from "../../assets/svg/icons/PDF_icon.svg";
import { ReactComponent as DOCX } from "../../assets/svg/icons/DOCX_icon.svg";
import { ReactComponent as XLSX } from "../../assets/svg/icons/XLSX_icon.svg";
import { formatFileSize } from "../../utils";
import { DocumentContext } from "../../context";
import { LoadingGear } from "../../assets/svg";

function Memo_Add_Dialog({ openAddDocs, setOpenAddDocs, submit }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openOptions, setOpenOptions] = useState("");
  const {
    error,
    setError,
    documentState,
    setDocumentState,
    documentFiles,
    setDocumentFiles,
    fileDetails,
    setFileDetails,
    handleSubmit,
    handleFileSelect,
    handleFileRemove,
    users,
    initialDocumentState,
    handleCancel,
    dropdowns,
    userProfile,
  } = useContext(DocumentContext);

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
  return (
    <section id="Memo_Add_Dialog" className="Memo_Add_Dialog">
      <Dialog
        className="Dialog_Container"
        fullScreen={fullScreen}
        fullWidth
        maxWidth={"md"}
        open={openAddDocs}
        onClose={() => handleCancel("Add")}
      >
        <Paper sx={{ backgroundColor: "#F4F4F4" }}>
          <DialogTitle>
            <div className="Dialog_Top">
              <span className="Dialog_Title">Add Document</span>
              <div className="Dialog_Close" onClick={() => handleCancel("Add")}>
                <IoIcons.IoMdClose size={"30px"} />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <form id="add_Form" onSubmit={handleSubmit}>
              <div className="Dialog_Body">
                <div className="wrapper">
                  {/* Left Side */}
                  <div className="Left_Side">
                    {/* DateTime Input */}
                    <div className="Date_Time">
                      <div className="Input_Group">
                        <span className="Input_Label">
                          Date Received <span className="required">*</span>
                        </span>
                        <input
                          required
                          disabled={submit && submit === true}
                          className="Input"
                          type="date"
                          value={documentState.Date_Received || ""}
                          onChange={(e) =>
                            setDocumentState({
                              ...documentState,
                              Date_Received: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="Input_Group">
                        <span className="Input_Label">
                          Time Received <span className="required">*</span>
                        </span>
                        <input
                          required
                          disabled={submit && submit === true}
                          className="Input"
                          type="time"
                          value={documentState.Time_Received || ""}
                          onChange={(e) =>
                            setDocumentState({
                              ...documentState,
                              Time_Received: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">
                        Incoming/Outgoing <span className="required">*</span>
                      </span>
                      <input
                        className="Input"
                        type="text"
                        readOnly
                        required
                        placeholder="Incoming/Outgoing"
                        value={documentState.Incoming_Outgoing || ""}
                        onFocus={() => showOptions("Incoming/Outgoing")}
                        onBlur={() => closeOptions()}
                        disabled={submit && submit === true}
                      />
                      <div
                        className={
                          openOptions === "Incoming/Outgoing"
                            ? "Options show"
                            : "Options"
                        }
                      >
                        <div
                          className="Option"
                          onClick={() =>
                            setDocumentState({
                              ...documentState,
                              Incoming_Outgoing: "Incoming",
                            })
                          }
                        >
                          <p>Incoming</p>
                        </div>
                        <div
                          className="Option"
                          onClick={() =>
                            setDocumentState({
                              ...documentState,
                              Incoming_Outgoing: "Outgoing",
                            })
                          }
                        >
                          <p>Outgoing</p>
                        </div>
                      </div>
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">
                        Document Name <span className="required">*</span>
                      </span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Document Name"
                        required
                        maxLength={100}
                        value={documentState.Document_Name || ""}
                        onChange={(e) =>
                          setDocumentState({
                            ...documentState,
                            Document_Name: e.target.value,
                          })
                        }
                        disabled={submit && submit === true}
                      />
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">
                        Office/Dept <span className="required">*</span>
                      </span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Document Type"
                        required
                        maxLength={100}
                        value={documentState.Office_Dept || ""}
                        onChange={(e) =>
                          setDocumentState({
                            ...documentState,
                            Office_Dept: e.target.value,
                          })
                        }
                        onFocus={() => showOptions("Office/Dept")}
                        onBlur={() => closeOptions()}
                        disabled={submit && submit === true}
                      />
                      <div
                        className={
                          openOptions === "Office/Dept"
                            ? "Options show"
                            : "Options"
                        }
                      >
                        {dropdowns &&
                          dropdowns
                            .filter(
                              (dropdown) =>
                                dropdown.option_For === "Office/Dept"
                            )
                            .map((dropdown) =>
                              dropdown.dropdown_option
                                .split(", ")
                                .map((option) => (
                                  <div
                                    key={option}
                                    className="Option"
                                    onClick={() =>
                                      setDocumentState({
                                        ...documentState,
                                        Office_Dept: option,
                                      })
                                    }
                                  >
                                    <p>{option}</p>
                                  </div>
                                ))
                            )}
                      </div>
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">
                        Received By <span className="required">*</span>
                      </span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Received By"
                        required
                        maxLength={155}
                        onFocus={() => showOptions("Received By")}
                        onBlur={() => closeOptions()}
                        value={documentState.Received_By || ""}
                        onChange={(e) =>
                          setDocumentState({
                            ...documentState,
                            Received_By: e.target.value,
                          })
                        }
                        disabled={submit && submit === true}
                      />
                      <div
                        className={
                          openOptions === "Received By"
                            ? "Options show"
                            : "Options"
                        }
                      >
                        {users.filter(
                          (user) =>
                            user.role !== "Faculty" &&
                            user.role !== "Admin" &&
                            user.role !== "Dean" &&
                            user.full_Name
                              .toLowerCase()
                              .includes(documentState.Received_By.toLowerCase())
                        ).length !== 0 ? (
                          <React.Fragment>
                            {users
                              .filter(
                                (user) =>
                                  user.role !== "Faculty" &&
                                  user.role !== "Admin" &&
                                  user.role !== "Dean" &&
                                  user.full_Name
                                    .toLowerCase()
                                    .includes(
                                      documentState.Received_By.toLowerCase()
                                    )
                              )
                              .map((user) => (
                                <div
                                  className="Option"
                                  key={user.user_id}
                                  onClick={() =>
                                    setDocumentState({
                                      ...documentState,
                                      Received_By: user.full_Name,
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

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">Contact Person</span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Contact Person"
                        maxLength={100}
                        onFocus={() => showOptions("Contact Person")}
                        onBlur={() => closeOptions()}
                        value={documentState.Contact_Person || ""}
                        onChange={(e) =>
                          setDocumentState({
                            ...documentState,
                            Contact_Person: e.target.value,
                          })
                        }
                        disabled={submit && submit === true}
                      />
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">
                        Short Description <span className="required">*</span>
                      </span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Short Description"
                        required
                        maxLength={1000}
                        value={documentState.Description || ""}
                        onChange={(e) =>
                          setDocumentState({
                            ...documentState,
                            Description: e.target.value,
                          })
                        }
                        disabled={submit && submit === true}
                      />
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">Comment/Note</span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Comment/Note"
                        maxLength={1000}
                        value={documentState.Comment_Note || ""}
                        onChange={(e) =>
                          setDocumentState({
                            ...documentState,
                            Comment_Note: e.target.value,
                          })
                        }
                        disabled={submit && submit === true}
                      />
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">
                        Status <span className="required">*</span>
                      </span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Status"
                        required
                        maxLength={45}
                        onFocus={() => showOptions("Status")}
                        onBlur={() => closeOptions()}
                        value={documentState.Status || ""}
                        onChange={(e) =>
                          setDocumentState({
                            ...documentState,
                            Status: e.target.value,
                          })
                        }
                        disabled={submit && submit === true}
                      />
                      <div
                        className={
                          openOptions === "Status" ? "Options show" : "Options"
                        }
                      >
                        <div
                          className="Option"
                          onClick={(e) =>
                            setDocumentState({
                              ...documentState,
                              Status: "Approved",
                            })
                          }
                        >
                          <p>Approved</p>
                        </div>
                        <div
                          className="Option"
                          onClick={(e) =>
                            setDocumentState({
                              ...documentState,
                              Status: "Pending",
                            })
                          }
                        >
                          <p>Pending</p>
                        </div>
                        <div
                          className="Option"
                          onClick={(e) =>
                            setDocumentState({
                              ...documentState,
                              Status: "Rejected",
                            })
                          }
                        >
                          <p>Rejected</p>
                        </div>
                      </div>
                    </div>

                    {/* Other Inputs */}
                    <div className="Input_Group">
                      <span className="Input_Label">Forward To</span>
                      <input
                        className="Input"
                        type="text"
                        placeholder="Forward To"
                        readOnly
                        value={
                          users.find(
                            (user) => user.user_id === documentState.Forward_To
                          )?.full_Name || ""
                        }
                        onFocus={() => showOptions("Forward To")}
                        onBlur={() => closeOptions()}
                        disabled={submit && submit === true}
                      />
                      <div
                        className={
                          openOptions === "Forward To"
                            ? "Options show"
                            : "Options"
                        }
                      >
                        <div
                          className="Option"
                          onClick={() =>
                            setDocumentState({
                              ...documentState,
                              Forward_To: "",
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
                                    setDocumentState({
                                      ...documentState,
                                      Forward_To: user.user_id,
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
                  </div>

                  {/* Right Side */}
                  <div className="Right_Side">
                    <span className="divider mobile"></span>
                    <div className="Urgent_Container">
                      <span className="Label">
                        Is the document urgent?(Yes if urgent)
                      </span>
                      <div className="checkbox-wrapper-8">
                        <input
                          disabled={
                            (submit && submit === true) ||
                            documentState.Forward_To === ""
                          }
                          className="tgl tgl-skewed"
                          id="cb3-8"
                          checked={documentState.Urgent === 1}
                          type="checkbox"
                          onChange={() =>
                            setDocumentState({
                              ...documentState,
                              Urgent: documentState.Urgent === 0 ? 1 : 0,
                            })
                          }
                        />
                        <label
                          className="tgl-btn"
                          data-tg-off="No"
                          data-tg-on="Yes"
                          htmlFor="cb3-8"
                        ></label>
                      </div>
                    </div>
                    <span className="divider"></span>
                    <div className="Label">
                      <span>
                        Add Document File/s <span className="required">*</span>
                      </span>
                    </div>
                    <div className="FileUpload">
                      <div className="Icon">
                        <SlIcons.SlCloudUpload size={"30px"} />
                      </div>
                      <p className="Main">Click to upload</p>
                      <p className="Sub">
                        .png, .jpeg, .jpg, .doc, .docx, .pdf, .xls, .xlsx
                      </p>
                      <input
                        required
                        disabled={submit && submit === true}
                        type="file"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        multiple
                        capture="environment"
                        accept="image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      />
                    </div>
                    {error.isError && (
                      <div className="errorMessage">
                        <p>{error.errorMessage}</p>
                      </div>
                    )}
                    <div className="Files">
                      {documentFiles.map((file, index) => (
                        <div
                          className="File"
                          key={`${file.lastModified} ${file.name}`}
                        >
                          <div className="Icon">
                            {file.type === "image/png" ||
                            file.type === "image/jpeg" ? (
                              <FaIcons.FaFileImage size={"25px"} />
                            ) : file.type === "application/pdf" ? (
                              <PDF />
                            ) : file.type === "application/msword" ||
                              file.type ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                              <DOCX />
                            ) : (
                              file.type === "application/vnd.ms-excel" ||
                              (file.type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                                <XLSX />
                              ))
                            )}
                          </div>
                          <div className="Name_Size">
                            <p className="Name">{file.name}</p>
                            <p className="Size">{formatFileSize(file.size)}</p>
                          </div>
                          <div className="Remove">
                            <div
                              className="Close_Icon"
                              onClick={() => handleFileRemove(index)}
                            >
                              <IoIcons.IoMdClose size={"30px"} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                onClick={() => handleCancel("Add")}
              >
                Cancel
              </button>
              <button type="submit" form="add_Form" className="Dialog_Submit">
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

export default Memo_Add_Dialog;
