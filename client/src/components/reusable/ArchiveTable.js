import React, { useState } from "react";
import "../../styles/archive_component_table.css";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as LuIcons from "react-icons/lu";
import * as HiIcons from "react-icons/hi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as MdIcons from "react-icons/md";
import * as CiIcons from "react-icons/ci";
import {
  Collapse,
  InputAdornment,
  Menu,
  TextField,
  Tooltip,
} from "@mui/material";
import { LoadingInfinite } from "../../assets/svg";
import { GetWindowWidth } from "../../utils";
import View_Document_Dialog from "../dialog modals/View_Document_Dialog";

import Signature from "../../assets/images/Sinature.png";
import noResult from "../../assets/images/noResult.png";
import toast from "react-hot-toast";
import { cloudname, domain, signatureFiles } from "../../constants";

function ArchiveTable({
  documents,
  filters,
  setFilter,
  trackers,
  refreshTracker,
  isLoading,
  currentPage,
  paginate,
  isLastPage,
}) {
  const [rotation, setRotation] = useState(0);
  const [openRow, setOpenRow] = useState(0);
  const [openViewDoc, setOpenViewDoc] = useState(false);
  const [editDocumentID, setEditDocumentID] = useState("");
  const windowWidth = GetWindowWidth();

  //Filter Menu Stuf
  const [filterFor, setFilterFor] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const openFilter = Boolean(anchorEl);

  const handleFilterOpen = (event, filterFor) => {
    setFilterFor(filterFor);
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const openToggleRow = (row) => {
    if (openRow === row) {
      setOpenRow(0);
    } else {
      setOpenRow(row);
    }
  };

  const openDoc = (props) => {
    setOpenViewDoc(true);
    setEditDocumentID(props);
  };

  return (
    <section id="Archive_Table_Component" className="Archive_Table_Component">
      {/* View Document */}
      <View_Document_Dialog
        openViewDoc={openViewDoc}
        setOpenViewDoc={setOpenViewDoc}
        document_id={editDocumentID}
      />

      <div className="wrapper">
        <div className="Table_Top">
          <div className="Table_Top_Right">
            <div className="Input_Group">
              <div className="Custom_Search">
                <div className="Icon">
                  <IoIcons.IoIosSearch size={"20px"} />
                </div>
                <input
                  value={filters.searchFilter}
                  className="Input"
                  type="text"
                  placeholder="Search..."
                  onChange={(e) =>
                    setFilter({ ...filters, searchFilter: e.target.value })
                  }
                />
                <div
                  className={`Close_Icon ${filters.searchFilter && "visible"}`}
                >
                  <MdIcons.MdOutlineClose
                    size={"25px"}
                    onClick={(e) => setFilter({ ...filters, searchFilter: "" })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Table_Container">
          {!isLoading ? (
            <React.Fragment>
              <div className="Table">
                {windowWidth > 540 ? (
                  <React.Fragment>
                    <div className="Table_Header_Container">
                      <div className="Tabler_Header">
                        <span className="Table_Header_Label">
                          {filters.docuNameFilter || "Document Name"}
                        </span>
                        <span
                          id="FilterDocName"
                          className="Table_Header_Filter"
                          onClick={(e) => handleFilterOpen(e, "docuNameFilter")}
                        >
                          <HiIcons.HiFilter size={"25px"} />
                        </span>
                      </div>
                      <div className="Tabler_Header">
                        <span className="Table_Header_Label">
                          {filters.docuTypeFilter || "Document Type"}
                        </span>
                        <span
                          id="FilterDocuType"
                          className="Table_Header_Filter"
                          onClick={(e) => handleFilterOpen(e, "docuTypeFilter")}
                        >
                          <HiIcons.HiFilter size={"25px"} />
                        </span>
                      </div>
                      <div className="Tabler_Header ReceivedBy">
                        <span className="Table_Header_Label">
                          {filters.docuReceivedBy || "Received By"}
                        </span>
                        <span
                          id="FilterReceivedBy"
                          className="Table_Header_Filter"
                          onClick={(e) => handleFilterOpen(e, "docuReceivedBy")}
                        >
                          <HiIcons.HiFilter size={"25px"} />
                        </span>
                      </div>
                      <div className="Tabler_Header OfficeDept">
                        <span className="Table_Header_Label">
                          {filters.officeDeptFilter || "Office/Dept"}
                        </span>
                        <span
                          id="FilterOfficeDept"
                          className="Table_Header_Filter"
                          onClick={(e) =>
                            handleFilterOpen(e, "officeDeptFilter")
                          }
                        >
                          <HiIcons.HiFilter size={"25px"} />
                        </span>
                      </div>
                      <div className="Tabler_Header DateReceived">
                        <span className="Table_Header_Label">
                          {filters.dateReceivedFilter || "Date Received"}
                        </span>
                        <span
                          id="FilterDate"
                          className="Table_Header_Filter"
                          onClick={(e) =>
                            handleFilterOpen(e, "dateReceivedFilter")
                          }
                        >
                          <HiIcons.HiFilter size={"25px"} />
                        </span>
                      </div>
                      <div className="Tabler_Header">
                        <span className="Table_Header_Label">
                          {filters.statusFilter || "Status"}
                        </span>
                        <span
                          id="FilterStatus"
                          className="Table_Header_Filter"
                          onClick={(e) => handleFilterOpen(e, "statusFilter")}
                        >
                          <HiIcons.HiFilter size={"25px"} />
                        </span>
                      </div>
                      <div className="Tabler_Header">
                        <span className="Table_Header_Label">Action</span>
                      </div>
                      <Menu
                        anchorEl={anchorEl}
                        id="Filter_Menu"
                        open={openFilter}
                        onClose={handleFilterClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            minWidth: "250px",
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "#FFFFFF",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        {filterFor === "dateReceivedFilter" ? (
                          <div className="Filter_Container">
                            <div className="Input_Group">
                              <span className="Input_Label">Date Received</span>
                              <input
                                required
                                className="Input"
                                type="date"
                                value={filters.dateReceivedFilter || ""}
                                onChange={(e) =>
                                  setFilter({
                                    ...filters,
                                    dateReceivedFilter: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="Filter_Container">
                            <div className="Input_Group">
                              <span className="Input_Label">Filter</span>
                              <div className="Custom_Email">
                                <input
                                  className="Input"
                                  type="text"
                                  autoComplete="true"
                                  placeholder="Type filter..."
                                  value={filters[filterFor] || ""}
                                  onChange={(e) =>
                                    setFilter({
                                      ...filters,
                                      [filterFor]: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Menu>
                    </div>
                    <div className="Table_Body_Container">
                      {documents && documents.length !== 0 ? (
                        <React.Fragment>
                          {documents.map((document) => (
                            <div
                              className="Table_Body_Row"
                              key={document.archive_id || document.document_id}
                            >
                              <div className="Table_Body_Details">
                                <div
                                  onClick={() =>
                                    openToggleRow(
                                      document.archive_id ||
                                        document.document_id
                                    )
                                  }
                                >
                                  <Tooltip title={document.document_Name}>
                                    <p>{document.document_Name}</p>
                                  </Tooltip>
                                </div>
                                <div
                                  onClick={() =>
                                    openToggleRow(
                                      document.archive_id ||
                                        document.document_id
                                    )
                                  }
                                >
                                  <Tooltip title={document.document_Type}>
                                    <p>{document.document_Type}</p>
                                  </Tooltip>
                                </div>
                                <div
                                  onClick={() =>
                                    openToggleRow(
                                      document.archive_id ||
                                        document.document_id
                                    )
                                  }
                                  className="ReceivedBy"
                                >
                                  <Tooltip title={document.received_By}>
                                    <p>{document.received_By}</p>
                                  </Tooltip>
                                </div>
                                <div
                                  onClick={() =>
                                    openToggleRow(
                                      document.archive_id ||
                                        document.document_id
                                    )
                                  }
                                  className="OfficeDept"
                                >
                                  <Tooltip title={document.office_Dept}>
                                    <p>{document.office_Dept}</p>
                                  </Tooltip>
                                </div>
                                <div
                                  onClick={() =>
                                    openToggleRow(
                                      document.archive_id ||
                                        document.document_id
                                    )
                                  }
                                  className="DateReceived"
                                >
                                  <Tooltip title={document.date_Received}>
                                    <p>{document.date_Received}</p>
                                  </Tooltip>
                                </div>
                                <div
                                  className={`Status ${
                                    document.status === "Approved"
                                      ? "Approved"
                                      : document.status === "Pending"
                                      ? "Ongoing"
                                      : document.status === "Rejected"
                                      ? "Rejected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    openToggleRow(document.archive_id)
                                  }
                                >
                                  <p>{document.status}</p>
                                </div>
                                <div className="Actions">
                                  <Tooltip title="View Document">
                                    <button
                                      className="View"
                                      onClick={() =>
                                        openDoc(
                                          document.archive_id ||
                                            document.document_id
                                        )
                                      }
                                    >
                                      <GrIcons.GrView size={"20px"} />
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                              <Collapse
                                in={
                                  openRow === document.archive_id ||
                                  openRow === document.document_id
                                }
                                timeout={"auto"}
                                unmountOnExit
                              >
                                <div className="Table_Body_Other_Details">
                                  <div className="Other_Details">
                                    <span>Description:</span>
                                    <p>{document.description}</p>
                                  </div>
                                  <div className="Other_Details">
                                    <span>Comment:</span>
                                    {document.comment ? (
                                      <p>{document.comment}</p>
                                    ) : (
                                      <p style={{ color: "#A5A6A6" }}>N/A</p>
                                    )}
                                  </div>
                                  <div className="Other_Details">
                                    <span>Tracker:</span>
                                    <div className="Tracker">
                                      {trackers &&
                                      trackers.filter(
                                        (tracker) =>
                                          tracker.document_id ===
                                            document.archive_id ||
                                          tracker.document_id ===
                                            document.document_id
                                      ).length === 0 ? (
                                        <div className="Tracker_Item">
                                          <div className="Tracker_Add">
                                            <span>No Tracking Data</span>
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          {trackers &&
                                            trackers
                                              .filter(
                                                (tracker) =>
                                                  tracker.document_id ===
                                                    document.archive_id ||
                                                  tracker.document_id ===
                                                    document.document_id
                                              )
                                              .map((tracker) => (
                                                <div
                                                  className="Tracker_Item"
                                                  key={tracker.tracker_id}
                                                >
                                                  <div className="Tracker_Details">
                                                    <div className="Signature">
                                                      <img
                                                        src={`${signatureFiles}/${tracker.tracker_id}-signature.png`}
                                                        alt="Signature"
                                                      />
                                                    </div>
                                                    <p className="Tracker_Date">
                                                      {new Date(
                                                        tracker.date_Created
                                                      ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                          month: "long",
                                                          day: "numeric",
                                                          year: "numeric",
                                                        }
                                                      )}
                                                    </p>
                                                    <p className="Tracker_Label">
                                                      {tracker.traker_label}
                                                    </p>
                                                  </div>
                                                  {trackers.filter(
                                                    (tracker) =>
                                                      tracker.document_id ===
                                                        document.archive_id ||
                                                      tracker.document_id ===
                                                        document.document_id
                                                  ).length > 1 && (
                                                    <div className="Right_Arrow">
                                                      <MdIcons.MdKeyboardDoubleArrowRight
                                                        size={"30px"}
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              ))}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Collapse>
                            </div>
                          ))}
                        </React.Fragment>
                      ) : (
                        <div className="Table_Empty">
                          <div className="Empty_Image">
                            <img src={noResult} alt="No Result" />
                          </div>
                          <div className="Empty_Labels">
                            <span className="Main_Label">
                              NO DOCUMENTS FOUND!
                            </span>
                            <span className="Sub_Label">
                              Click the add new document button to add
                              documents.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="Table_Row_Container_Mobile">
                      <React.Fragment>
                        {documents && documents.length > 0 ? (
                          <>
                            {documents.map((document) => (
                              <div
                                className="Table_Row"
                                key={document.document_id}
                              >
                                <div className="Table_Header_Container">
                                  <div className="Tabler_Header">
                                    <span className="Table_Header_Label">
                                      Document Name:
                                    </span>
                                    <p>{document.document_Name}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className="Table_Header_Label">
                                      Document Type:
                                    </span>
                                    <p>{document.document_Type}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className="Table_Header_Label">
                                      Received By:
                                    </span>
                                    <p>{document.received_By}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className="Table_Header_Label">
                                      Office/Dept:
                                    </span>
                                    <p>{document.office_Dept}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className="Table_Header_Label">
                                      Date Received:
                                    </span>
                                    <p>{document.date_Received}</p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className="Table_Header_Label">
                                      Status:
                                    </span>
                                    <p
                                      className={`Status ${
                                        document.status === "Approved"
                                          ? "Approved"
                                          : document.status === "Pending"
                                          ? "Ongoing"
                                          : document.status === "Rejected"
                                          ? "Rejected"
                                          : ""
                                      }`}
                                    >
                                      {document.status}
                                    </p>
                                  </div>
                                  <div className="Tabler_Header">
                                    <span className="Table_Header_Label">
                                      Action:
                                    </span>
                                    <div className="Actions">
                                      <Tooltip title="View Document">
                                        <button
                                          className="Action View"
                                          onClick={() =>
                                            openDoc(document.document_id)
                                          }
                                        >
                                          <GrIcons.GrView size={"20px"} />
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="Table_Empty">
                            <div className="Empty_Image">
                              <img src={noResult} alt="No Result" />
                            </div>
                            <div className="Empty_Labels">
                              <span className="Main_Label">
                                NO DOCUMENTS FOUND!
                              </span>
                              <span className="Sub_Label">
                                Click the add new document button to add
                                documents.
                              </span>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          ) : (
            <div className="Loader">
              <LoadingInfinite width="150px" height="150px" />
            </div>
          )}
        </div>
        <div className="Table_Pagination">
          <button
            disabled={currentPage === 1}
            className="Pagination_Previous"
            onClick={() => paginate("Back")}
          >
            Previous
          </button>
          <button
            disabled={isLastPage && documents && documents.length > 0}
            className="Pagination_Next"
            onClick={() => paginate("Next")}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default ArchiveTable;
