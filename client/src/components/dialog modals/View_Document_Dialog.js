import React, { useContext, useEffect, useState } from "react";

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

import "../../styles/view_document_dialog.css";

import * as IoIcons from "react-icons/io";
import * as SlIcons from "react-icons/sl";

import { ReactComponent as PDF } from "../../assets/svg/icons/PDF_icon.svg";
import { LoadingInfinite } from "../../assets/svg";
import Signature from "../../assets/images/Sinature.png";
import View_Files from "./View_Files";
import { DocumentContext } from "../../context";
import {
  formatTimeAmPm,
  getAllUsers,
  getDocumentData,
  getFiles,
  getTrackers,
} from "../../utils";
import { signatureFiles } from "../../constants";

function View_Document_Dialog({ openViewDoc, setOpenViewDoc, document_id }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [pdfToView, setPdfToView] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [stepperLoading, setStepperLoading] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);
  const [documents, setDocuments] = useState({});
  const [fileDetails, setFileDetails] = useState([]);

  //Files
  const [imageFiles, setImageFiles] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [docFiles, setDocFiles] = useState([]);
  const [excelFiles, setExcelFiles] = useState([]);

  const [trackers, setTrackers] = useState([]);
  const [users, setUsers] = useState([]);

  const getTrackerData = async () => {
    setStepperLoading(true);
    const trackerRes = await getTrackers();
    if (trackerRes?.status === 200) {
      if (trackerRes.data?.hasData === true) {
        const sortedTrackers = trackerRes.data.trackers.sort((a, b) => {
          // Convert date strings to Date objects for comparison
          const dateA = new Date(a.date_Created);
          const dateB = new Date(b.date_Created);

          // Compare dates
          return dateA - dateB; // Descending order
        });

        setTrackers(sortedTrackers);
      }
    } else {
      toast.error(trackerRes?.errorMessage);
    }
    setStepperLoading(false);
  };

  const getUserOptions = async () => {
    const res = await getAllUsers();
    if (res?.status === 200) {
      setUsers(res.data?.users);
    } else toast.error("An error occured while fetching data.");
  };

  //Get table data
  const getTableDocuments = async () => {
    if (!document_id) return;
    setDetailsLoading(true);
    const res = await getDocumentData({ document_id: document_id });

    if (res?.status === 200) {
      if (res?.data.hasData) {
        setDetailsLoading(false);
        const documentData = res.data?.document;
        setDocuments(documentData[0]);
      }
    } else toast.error("An error occured while fetching data.");
  };

  const handleCancel = () => {
    setDocuments({});
    setFileDetails([]);
    setImageFiles([]);
    setDocFiles([]);
    setPdfFiles([]);
    setExcelFiles([]);
    setOpenViewDoc(false);
  };

  const getFilesData = async () => {
    setFilesLoading(true);
    const res = await getFiles({ document_id: document_id });
    if (res?.status === 200) {
      if (res?.data.hasData == true) {
        setFilesLoading(false);
        const files = res.data?.files;
        const images = files.filter((file) =>
          /\.(png|jpg|jpeg)$/i.test(file.file_Name)
        );
        const pdfs = files.filter((file) => /\.(pdf)$/i.test(file.file_Name));
        const docs = files.filter((file) =>
          /\.(doc|docx)$/i.test(file.file_Name)
        );
        const excels = files.filter((file) =>
          /\.(xls|xlsx)$/i.test(file.file_Name)
        );
        setImageFiles(images);
        setPdfFiles(pdfs);
        setDocFiles(docs);
        setExcelFiles(excels);
        setFileDetails(files);
      }
    } else {
      setFilesLoading(false);
      toast.error("Failed fetching files.");
    }
  };

  const getForwardTo = (forward_To) => {
    if (forward_To) {
      if (forward_To.includes("All")) {
        return "All users";
      } else if (forward_To.includes("Clerk")) {
        return "All clerks";
      } else if (forward_To.includes("Faculty")) {
        return "All faculty";
      } else if (
        forward_To !== null &&
        forward_To !== "" &&
        forward_To !== undefined
      ) {
        return users.find((user) => user.user_id === forward_To)?.full_Name;
      }
    } else {
      return "N/A";
    }
  };

  useEffect(() => {
    getTableDocuments();
    getFilesData();
    getTrackerData();
    getUserOptions();
  }, [openViewDoc]);

  return (
    <section id="View_Document_Dialog" className="View_Document_Dialog">
      <Dialog
        className="View_Dialog_Container"
        fullScreen={fullScreen}
        fullWidth
        maxWidth={"xl"}
        open={openViewDoc}
        onClose={() => handleCancel()}
        disableEscapeKeyDown={pdfToView}
      >
        <Paper sx={{ backgroundColor: "#F4F4F4" }}>
          <DialogTitle>
            <div className="View_Dialog_Top">
              <span className="View_Dialog_Title">
                {documents.document_Name}
              </span>
              <div className="View_Dialog_Close" onClick={() => handleCancel()}>
                <IoIcons.IoMdClose size={"30px"} />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="View_Dialog_Body">
              <div className="wrapper">
                <div className="Left_Side">
                  <div className="Document_Details_Container">
                    <span className="Label">Document Details</span>
                    {!detailsLoading && documents ? (
                      <div className="Document_Details">
                        <div className="Detail_Group">
                          <span className="Label">Date Received</span>
                          <p className="Detail">{`${new Date(
                            documents.date_Received
                          ).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })} - ${formatTimeAmPm(documents.time_Received)}`}</p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Document Name</span>
                          <p className="Detail">{documents.document_Name}</p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Document Type</span>
                          <p className="Detail">
                            {documents.document_Type || "N/A"}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Document Category</span>
                          <p className="Detail">
                            {documents.document_Category || "N/A"}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Received By</span>
                          <p className="Detail">{documents.received_By}</p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Office/Department</span>
                          <p className="Detail">
                            {documents.office_Dept || "N/A"}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Contact Person</span>
                          <p className="Detail">
                            {documents.contact_Person || "N/A"}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Description</span>
                          <p className="Detail">{documents.description}</p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Status</span>
                          <p className={`Detail Status ${documents.status}`}>
                            {documents.status}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Forwared To</span>
                          <p className="Detail">
                            {getForwardTo(documents.forward_To)}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Accepted/Rejected By</span>
                          <p className="Detail">
                            {documents.accepted_Rejected_By
                              ? users.find(
                                  (user) =>
                                    user.user_id ===
                                    documents.accepted_Rejected_By
                                )?.full_Name || "N/A"
                              : "Pending"}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Accepted/Rejected in</span>
                          <p className="Detail">
                            {documents.accepted_Rejected_By
                              ? new Date(
                                  documents.accepted_Rejected_Date
                                ).toLocaleDateString("en-us", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "Pending"}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Added By</span>
                          <p className="Detail">
                            {users.find(
                              (user) => user.user_id === documents.created_By
                            )?.full_Name || "N/A"}
                          </p>
                        </div>
                        <div className="Detail_Group">
                          <span className="Label">Comment/Note</span>
                          <p className="Detail">{documents.comment || "N/A"}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="Loader">
                        <LoadingInfinite width="75px" height="75px" />
                      </div>
                    )}
                  </div>
                  <div className="Document_Tracker_Container">
                    <span className="Label">Document Tracker</span>
                    {!stepperLoading ? (
                      <div className="Tracker_Details">
                        {trackers &&
                        trackers.filter(
                          (tracker) => tracker.document_id === document_id
                        ).length > 0 ? (
                          <div className="rightbox">
                            <div className="rb-container">
                              <ul className="rb">
                                {trackers &&
                                  trackers
                                    .filter(
                                      (tracker) =>
                                        tracker.document_id === document_id
                                    )
                                    .map((tracker) => (
                                      <li
                                        className="rb-item"
                                        ng-repeat="itembx"
                                        key={tracker.tracker_id}
                                      >
                                        <div className="timestamp">
                                          {new Date(
                                            tracker.date_Created
                                          ).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </div>
                                        <div className="item-title">
                                          <span className="Office signature">
                                            {tracker.traker_label}
                                          </span>
                                          <img
                                            src={`${signatureFiles}/${tracker.tracker_id}-signature.png`}
                                            alt="Signature"
                                            className="Signature"
                                          />
                                        </div>
                                      </li>
                                    ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="Tracker_Empty">
                            <span>No Tracking Data</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="Loader">
                        <LoadingInfinite width="75px" height="75px" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="Right_Side">
                  <View_Files
                    isFileLoading={filesLoading}
                    setIsFileLoading={setFilesLoading}
                    pdfToView={pdfToView}
                    setPdfToView={setPdfToView}
                    files={fileDetails || []}
                    imageFiles={imageFiles}
                    pdfFiles={pdfFiles}
                    docFiles={docFiles}
                    excelFiles={excelFiles}
                    documentName={documents.document_Name}
                    handleCancel={() => handleCancel()}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Paper>
      </Dialog>
    </section>
  );
}

export default View_Document_Dialog;
