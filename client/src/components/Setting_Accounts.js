import React, { useEffect, useState } from "react";

import "../styles/setting_accounts.css";

// Icons
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { Avatar, Menu, Tooltip } from "@mui/material";
import Create_Staff_Dialog from "./dialog modals/Create_Staff_Dialog";
import { changeUserStatus, getAllUsers } from "../utils";
import toast from "react-hot-toast";
import noResult from "../assets/images/noResult.png";
import { cloudname, domain, profile_Pic } from "../constants";
import { LoadingInfinite } from "../assets/svg";

function Setting_Accounts() {
  const [openCreateStaff, setOpenCreateStaff] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayAccounts, setDisplayAccounts] = useState("Approved");
  const [usersToFilter, setUsersToFilter] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userID, setUserID] = useState("");
  const [isUserActive, setIsUserActive] = useState("");
  const [users, setUsers] = useState([]);
  const [userSearch, setUSerSearch] = useState("");

  const changeDisplayedAccounts = (status) => {
    setDisplayAccounts(status);
  };

  const getUsers = async () => {
    setIsLoading(true);
    const res = await getAllUsers();
    if (res?.status === 200) {
      setIsLoading(false);
      setUsersToFilter(res.data?.users);
    } else {
      toast.error("An error occured while fetching data.");
    }
  };

  useEffect(() => {
    getUsers();
  }, [displayAccounts]);

  //Filter Users
  useEffect(() => {
    if (usersToFilter) {
      // Create a copy of usersToFilter array
      let filteredUsers = usersToFilter.slice();

      if (displayAccounts === "Approved") {
        filteredUsers = filteredUsers.filter(
          (user) => user.status === "Active" || user.status === "Deactivated"
        );
      } else if (displayAccounts === "Pending") {
        filteredUsers = filteredUsers.filter(
          (user) => user.status === "Pending"
        );
      } else if (displayAccounts === "Temporary") {
        filteredUsers = filteredUsers.filter(
          (user) => user.status === "Temporary"
        );
      }

      filteredUsers = filteredUsers.filter(
        (user) =>
          (displayAccounts !== "Temporary" &&
            (user.full_Name.toLowerCase().includes(userSearch.toLowerCase()) ||
              user.email.toLowerCase().includes(userSearch.toLowerCase()))) ||
          (displayAccounts === "Temporary" &&
            (user.role.toLowerCase().includes(userSearch.toLowerCase()) ||
              user.email.toLowerCase().includes(userSearch.toLowerCase())))
      );

      filteredUsers = filteredUsers.filter(
        (user) => user.role !== "Admin" && user.role !== "Dean"
      );

      setUsers(filteredUsers);
    } else {
      setUsers(usersToFilter);
    }
  }, [usersToFilter, displayAccounts, userSearch]);

  const handleOpenMenu = (event, user_id, status) => {
    setAnchorEl(event.currentTarget);
    setUserID(user_id);
    setIsUserActive(status);
  };

  const handleAccountStatusChange = async (status) => {
    toast.loading("Please wait...");
    const res = await changeUserStatus({ user_id: userID, status: status });
    if (res?.status === 200) {
      toast.dismiss();
      toast.success("Successfully changed user status");
    } else {
      toast.dismiss();
      toast.error(res?.errorMessage);
    }

    setAnchorEl(null);
    setUserID("");
    setIsUserActive("");
    getUsers();
  };

  return (
    <section id="Setting_Accounts" className="Setting_Accounts">
      {/* Dialogs */}
      <Create_Staff_Dialog
        openCreateStaff={openCreateStaff}
        closeCreateStaff={setOpenCreateStaff}
      />
      <div className="wrapper">
        <div className="Accounts_Top">
          <div className="Accounts_Top_Left">
            <button onClick={() => setOpenCreateStaff(true)}>
              <MdIcons.MdOutlineAdd size={"20px"} /> ADD NEW STAFF
            </button>
          </div>
          <div className="Accounts_Top_Right">
            <div className="Filters">
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
            <div className="Input_Group">
              <div className="Custom_Search">
                <div className="Icon">
                  <IoIcons.IoIosSearch size={"20px"} />
                </div>
                <input
                  className="Input"
                  value={userSearch}
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setUSerSearch(e.target.value)}
                />
                <div className={`Close_Icon ${userSearch && "visible"}`}>
                  <MdIcons.MdOutlineClose
                    size={"25px"}
                    onClick={(e) => setUSerSearch("")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="Loader">
            <LoadingInfinite width="150px" height="150px" />
          </div>
        )}

        {!isLoading && users.length === 0 && (
          <div className="Table_Empty">
            <div className="Empty_Image">
              <img src={noResult} alt="No Result" />
            </div>
            <div className="Empty_Labels">
              <span className="Main_Label">NO USER/S FOUND!</span>
              <span className="Sub_Label">
                Click the add new staff button to add staff users.
              </span>
            </div>
          </div>
        )}
        {!isLoading && users.length > 0 && (
          <div className="Accounts_List">
            {users.map((user) => (
              <div className="Account">
                <div className="Account_Profile_Pic">
                  <Avatar
                    src={
                      user.profile_Pic
                        ? `${profile_Pic}/${user.profilePic}`
                        : ""
                    }
                    className="Profile_Pic"
                  >
                    {user.profile_Pic
                      ? null
                      : user.full_Name
                      ? user.full_Name[0].toUpperCase()
                      : user.email[0].toUpperCase()}
                  </Avatar>
                </div>
                <div className="Account_Email_Name_Status">
                  <div className="Email_Name">
                    <p className="Name">{user.full_Name || user.role}</p>
                    <p className="Email">{user.email}</p>
                  </div>
                  <div className={`Status ${user.status}`}>
                    <p>{user.status}</p>
                  </div>
                </div>
                <div className="Account_Options">
                  {displayAccounts === "Approved" && (
                    <Tooltip title="Options">
                      <div className="Status_Icon">
                        <MdIcons.MdOutlineMoreVert
                          size={"25px"}
                          onClick={(e) =>
                            handleOpenMenu(e, user.user_id, user.status)
                          }
                        />
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
            <Menu
              anchorEl={anchorEl || ""}
              id="Filter_Menu"
              open={anchorEl && userID !== ""}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                elevation: 0,
                sx: {
                  minWidth: "150px",
                  minHeight: "40px",
                  overflow: "visible",
                  padding: "0px 5px",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <div className={`User_Options ${isUserActive}`}>
                {isUserActive === "Active" ? (
                  <p onClick={() => handleAccountStatusChange("Deactivated")}>
                    <span>
                      <FaIcons.FaUserAltSlash size={"20px"} />
                    </span>
                    Deactivate Account
                  </p>
                ) : (
                  <p onClick={() => handleAccountStatusChange("Active")}>
                    <span>
                      <FaIcons.FaUserCheck size={"20px"} />
                    </span>
                    Activate Account
                  </p>
                )}
              </div>
            </Menu>
          </div>
        )}
      </div>
    </section>
  );
}

export default Setting_Accounts;
