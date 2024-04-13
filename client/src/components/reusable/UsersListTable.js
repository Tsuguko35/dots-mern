import React, { useState } from "react";

import "../../styles/userslisttable.css";

// Icons
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { Tooltip } from "@mui/material";
import noResult from "../../assets/images/noResult.png";
import { LoadingInfinite } from "../../assets/svg";
import { changeUserStatus, deleteUser } from "../../utils";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Change_Role_Dialog from "../dialog modals/Change_Role_Dialog";

function UsersListTable({
  users,
  getUsers,
  filters,
  setFilters,
  refreshTableFunc,
  isLoading,
}) {
  const [displayAccounts, setDisplayAccounts] = useState("Approved");
  const [rotation, setRotation] = useState(0);
  const [userIDForRoleChange, setUserIDForRoleChange] = useState("");
  const [roleToChange, setRoleToChange] = useState("");
  const [username, setUsername] = useState("");
  const [roleChangeDialogOpen, setRoleChangeDialogOpen] = useState(false);
  const changeDisplayedAccounts = (status) => {
    setFilters({ ...filters, status: status });
    setDisplayAccounts(status);
  };

  const refreshTable = () => {
    setRotation(rotation + 360);
  };

  const deleteUserData = async (user_id) => {
    Swal.fire({
      icon: "info",
      iconColor: "#FF8911",
      text: `Delete User?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No, cancel",
      cancelButtonColor: "#3A3535",
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#FF8911",
      focusConfirm: false,
      allowEscapeKey: true,
      allowOutsideClick: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.loading("Deleting. Please wait...");
        const res = await deleteUser({
          user_id: user_id,
        });
        if (res?.status === 200) {
          toast.dismiss();
          toast.success(`User has been deleted`);
          refreshTableFunc();
        } else toast.error(res?.errorMessage);
      } else {
        Swal.close();
      }
    });
  };

  const handleDeactivateActivate = (props) => {
    Swal.fire({
      icon: "info",
      iconColor: "#FF8911",
      text: `${props.status === "Active" ? "Activate" : "Deactivate"} User?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No, cancel",
      cancelButtonColor: "#3A3535",
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#FF8911",
      focusConfirm: false,
      allowEscapeKey: true,
      allowOutsideClick: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleAccountStatusChange({
          user_id: props.user_id,
          status: props.status,
        });
      } else {
        Swal.close();
      }
    });
  };

  const handleAccountStatusChange = async (props) => {
    toast.loading("Please wait...");
    const res = await changeUserStatus({
      user_id: props.user_id,
      status: props.status,
    });
    if (res?.status === 200) {
      toast.dismiss();
      toast.success("Successfully changed user status");
    } else {
      toast.error(res?.errorMessage);
    }

    refreshTableFunc();
  };

  const handleUserChangeRole = (userID, role, username) => {
    setRoleChangeDialogOpen(true);
    setRoleToChange(role);
    setUserIDForRoleChange(userID);
    setUsername(username);
  };

  return (
    <section id="UsersListTable" className="UsersListTable">
      {roleChangeDialogOpen && (
        <Change_Role_Dialog
          openChangeRole={roleChangeDialogOpen}
          closeChangeRole={setRoleChangeDialogOpen}
          userID={userIDForRoleChange}
          role={roleToChange}
          username={username}
          getUsers={getUsers}
        />
      )}
      <div className="wrapper">
        <div className="Table_Container">
          {/* TopSide */}
          <div className="Table_Top">
            {/* Left Side */}
            <div className="Table_Top_Left">
              <div className="Actions">
                <div
                  className={`Filter_Group ${
                    displayAccounts === "Approved" && "active"
                  }`}
                  onClick={() => changeDisplayedAccounts("Approved")}
                >
                  <span className="Icon">
                    <FaIcons.FaUserCheck size={"20px"} />
                  </span>
                  <span className="Label">Approved Accounts</span>
                </div>
                <div
                  className={`Filter_Group ${
                    displayAccounts === "Pending" && "active"
                  }`}
                  onClick={() => changeDisplayedAccounts("Pending")}
                >
                  <span className="Icon">
                    <FaIcons.FaUserClock size={"20px"} />
                  </span>
                  <span className="Label">Pending Accounts</span>
                </div>

                <div
                  className={`Filter_Group ${
                    displayAccounts === "Temporary" && "active"
                  }`}
                  onClick={() => changeDisplayedAccounts("Temporary")}
                >
                  <span className="Icon">
                    <FaIcons.FaUserCog size={"20px"} />
                  </span>
                  <span className="Label">Temporary Accounts</span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="Table_Top_Right">
              <Tooltip title="Refresh">
                <span
                  onClick={() => {
                    refreshTable();
                    refreshTableFunc();
                  }}
                >
                  <IoIcons.IoMdRefresh
                    size={"35px"}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: "transform 1s",
                    }}
                  />
                </span>
              </Tooltip>
              <div className="Input_Group">
                <div className="Custom_Search">
                  <div className="Icon">
                    <IoIcons.IoIosSearch size={"20px"} />
                  </div>
                  <input
                    className="Input"
                    value={filters.userSearch}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) =>
                      setFilters({ ...filters, userSearch: e.target.value })
                    }
                  />
                  <div
                    className={`Close_Icon ${filters.userSearch && "visible"}`}
                  >
                    <MdIcons.MdOutlineClose
                      size={"25px"}
                      onClick={(e) =>
                        setFilters({ ...filters, userSearch: "" })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="Table_Main">
            {/* Header */}
            <div className="Table_Header">
              <p className="Name">Name</p>
              <p className="Email">Email</p>
              <p className="Status">Status</p>
              <p className="Role">Role</p>
              <p className="Action">Action</p>
            </div>

            {isLoading && (
              <div className="Loading">
                <LoadingInfinite width="100px" />
              </div>
            )}

            {/* prettier-ignore    */}
            {!isLoading && users && users.length === 0 && (
              <div className="Table_Empty">
                <div className="Empty_Image">
                  <img src={noResult} alt="No Result" />
                </div>
                <div className="Empty_Labels">
                  <span className="Main_Label">NO USERS FOUND!</span>
                  <span className="Sub_Label">No users were found.</span>
                </div>
              </div>
            )}

            {/* Content */}
            {!isLoading &&
              users &&
              users.length > 0 &&
              users.map((user) => (
                <div className="Table_Content" key={user.user_id}>
                  <p className="Name">{user.full_Name}</p>
                  <p className="Email">{user.email}</p>
                  <p className={`Status ${user.status}`}>{user.status}</p>
                  <p className="Role">{user.role}</p>
                  <p className="Action">
                    {displayAccounts === "Pending" && (
                      <Tooltip title="Approve">
                        <span
                          className="Action_Item Approve"
                          onClick={() =>
                            handleDeactivateActivate({
                              user_id: user.user_id,
                              status: "Active",
                            })
                          }
                        >
                          <FaIcons.FaUserCheck size={"20px"} />
                        </span>
                      </Tooltip>
                    )}

                    {displayAccounts === "Approved" && (
                      <Tooltip title="Change Role">
                        <span
                          className="Action_Item Role"
                          onClick={() =>
                            handleUserChangeRole(
                              user.user_id,
                              user.role,
                              user.full_Name
                            )
                          }
                        >
                          <FaIcons.FaUserEdit size={"20px"} />
                        </span>
                      </Tooltip>
                    )}

                    {displayAccounts === "Approved" && (
                      <>
                        {user.status === "Deactivated" ? (
                          <Tooltip title="Activate">
                            <span
                              className="Action_Item Active"
                              onClick={() =>
                                handleDeactivateActivate({
                                  user_id: user.user_id,
                                  status: "Active",
                                })
                              }
                            >
                              <FaIcons.FaUser size={"20px"} />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Deactivate">
                            <span
                              className="Action_Item Deactivate"
                              onClick={() =>
                                handleDeactivateActivate({
                                  user_id: user.user_id,
                                  status: "Deactivated",
                                })
                              }
                            >
                              <FaIcons.FaUserAltSlash size={"20px"} />
                            </span>
                          </Tooltip>
                        )}
                      </>
                    )}
                    <Tooltip title="Delete">
                      <span
                        className="Action_Item Delete"
                        onClick={() => deleteUserData(user.user_id)}
                      >
                        <MdIcons.MdDelete size={"20px"} />
                      </span>
                    </Tooltip>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsersListTable;
