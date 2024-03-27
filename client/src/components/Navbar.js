import React, { useContext, useEffect, useState } from "react";
import "../styles/navbar.css";

// Icons
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as LuIcons from "react-icons/lu";
import * as HiIcons from "react-icons/hi";
import * as GoIcons from "react-icons/go";
import * as MdIcons from "react-icons/md";
import * as CiIcons from "react-icons/ci";

import { SidebarContext, logOutUser } from "../context";

import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  DateTime,
  formatDate,
  formatTime,
  getAllNotifications,
  getDocumentData,
  getTableData,
} from "../utils";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { NotificationContext } from "../context/context";
import notificationSound from "../assets/sounds/notification sound.mp3";

//Socket IO
import io from "socket.io-client";
import { ENDPOINT, cloudname, domain, profile_Pic } from "../constants";
import Swal from "sweetalert2";
var socket;

function Navbar() {
  //Notifications
  const { notifications, setNotifications, user } =
    useContext(NotificationContext);

  const navigate = useNavigate();
  const { setToggleSidebar } = useContext(SidebarContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const openNotif = Boolean(notificationAnchor);
  const userDetails = user;
  const firstLetterOfName = userDetails.full_Name
    ? userDetails.full_Name.charAt(0).toUpperCase()
    : "A";
  const open = Boolean(anchorEl);
  const [documents, setDocuments] = useState([]);

  const notifAudio = new Audio(notificationSound);
  notifAudio.preload = true;

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("notifications", (user_id) => {
      if (user) {
        if (userDetails.user_id === user_id.user_id) {
          getNotifications();
          if (user_id.action !== "Delete Notification") {
            notifAudio.play();
          }
        }
      }
    });

    return () => {
      socket.close();
    };
  }, [user]);

  useEffect(() => {
    getNotifications();
    getDocuments();
  }, [user]);

  const getNotifications = async () => {
    const res = await getAllNotifications();
    if (res?.status === 200) {
      if (res.data?.notifications) {
        let notificationData = res.data?.notifications;

        // Sort by date_Created in descending order
        notificationData.sort(
          (a, b) =>
            new Date(b.date_Created.replace(" ", "T")) -
            new Date(a.date_Created.replace(" ", "T"))
        );
        if (user) {
          setNotifications(
            notificationData.filter(
              (notification) => notification.user_id === userDetails.user_id
            )
          );
        }
      }
    } else {
      toast.error("Failed to get notifications");
    }
  };

  const getDocuments = async () => {
    const res = await getTableData({ documentType: "All" });

    if (res?.status === 200) {
      setDocuments(res.data?.documents);
    } else {
      toast.error("Failed to get documents for notification.");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNotification = (event) => {
    setNotificationAnchor(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setNotificationAnchor(null);
  };

  //Log out User
  const logout = async () => {
    Swal.fire({
      title: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: async () => {
        Swal.showLoading();
        const res = await logOutUser();
        Swal.close();
        if (res?.status === 200) {
          navigate("/");
        }

        if (res?.status === 400) {
          toast.error(res.data?.errorMessage);
        }
      },
    });
  };

  const redirect = (props) => {
    if (props === "SysSettings") {
      handleClose();
      navigate("/System-Settings");
    } else if (props === "AccSettings") {
      handleClose();
      navigate("/Account-Settings");
    }
  };

  const goToNotif = (document_id) => {
    const status = documents.find(
      (document) => document.document_id === document_id
    )?.status;
    if (status === "Approved") {
      navigate("/Requests/Approved");
    } else if (status === "Rejected") {
      navigate("/Requests/Rejected");
    } else {
      navigate("/Requests/Pending");
    }
  };

  return (
    <section id="Navbar" className="Navbar">
      <Toaster position="bottom center" />
      <div className="Sidebar_Toggle">
        <p>
          <IoIcons.IoMdMenu
            size={"35px"}
            onClick={() => setToggleSidebar(true)}
          />
        </p>
      </div>
      {/* Users Navbar */}
      {userDetails && userDetails.role !== "Admin" && (
        <div className="Navbar_Date_and_Profile">
          {/* Notifications */}
          <Tooltip title="Notifications">
            <div
              className="Navbar_Notifications"
              onClick={(e) => handleOpenNotification(e)}
            >
              <Badge
                badgeContent={
                  notifications &&
                  notifications.filter(
                    (notification) => notification.isRead !== 1
                  ).length
                }
                color="error"
              >
                <IoIcons.IoMdNotificationsOutline
                  size={"30px"}
                  className="icon"
                />
              </Badge>
            </div>
          </Tooltip>
          <Menu
            anchorEl={notificationAnchor}
            id="Navbar_Notification_Menu"
            open={openNotif}
            onClose={handleCloseNotification}
            PaperProps={{
              elevation: 0,
              sx: {
                minWidth: "250px",
                maxHeight: "400px",
                overflowY: "auto",
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
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {notifications && notifications.length === 0 ? (
              <div className="Notification_Empty">
                <p>No Notifications.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  className="Menu_Item_Notification"
                  key={notification.notification_id}
                  onClick={() => goToNotif(notification.document_id)}
                >
                  <ListItemIcon className="Notification_Icon">
                    {notification.notification_Type === "Forward" ? (
                      <RiIcons.RiMegaphoneLine className="Menu_Icons" />
                    ) : notification.notification_Type === "Approve" ? (
                      <RiIcons.RiCheckDoubleLine className="Menu_Icons" />
                    ) : (
                      <RiIcons.RiCloseLine className="Menu_Icons" />
                    )}
                  </ListItemIcon>
                  <div className="Notification_Text">
                    <div className="Notification_Date">
                      <p>
                        {`${new Date(
                          notification.date_Created
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })} - ${new Date(
                          notification.date_Created
                        ).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}`}
                      </p>
                    </div>
                    <div className="Notification_Label">
                      {notification.notification_Type === "Forward" ? (
                        <p>New Forwarded Document!</p>
                      ) : notification.notification_Type === "Approve" ? (
                        <p>Document Approved!</p>
                      ) : (
                        <p>Document Rejected!</p>
                      )}
                    </div>
                    <div className="Notification_Details">
                      <p>{notification.notification_Text}</p>
                    </div>
                  </div>
                  {notification.isRead === 0 && (
                    <div className="Notification_IsRead">
                      <span></span>
                    </div>
                  )}
                </MenuItem>
              ))
            )}
          </Menu>

          {/* Date and Time */}
          <Typography className="Navbar_Date" sx={{ minWidth: "100px" }}>
            <IoIcons.IoMdCalendar
              size={"30px"}
              style={{ marginRight: "10px" }}
            />
            <span className="Date_time">
              <span>{DateTime().date}</span>
              <span className="dot">&#183;</span>
              <span>{DateTime().time}</span>
            </span>
          </Typography>

          <Typography
            className="Navbar_Date_and_Profile_Role"
            sx={{ minWidth: "75px" }}
          >
            {userDetails.role}
          </Typography>

          {/* Account Menu */}
          <Tooltip title="Menu">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src={`https://res.cloudinary.com/${cloudname}/image/upload/fl_attachment/v1711537358/${user.profilePic}`}
                className="Avatar"
              >
                {user.profilePic ? null : firstLetterOfName}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="Navbar_Menu"
            open={open}
            onClose={handleClose}
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
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div className="Menu_Profile">
              <div className="Profile_Avatar">
                <span>
                  <Avatar
                    src={`https://res.cloudinary.com/${cloudname}/image/upload/fl_attachment/v1711537358/${user.profilePic}`}
                    className="Avatar"
                  >
                    {user.profilePic ? null : firstLetterOfName}
                  </Avatar>
                </span>
              </div>
              <div className="Profile_Name_Role">
                <span className="Profile_Name">{userDetails.full_Name}</span>
                <span className="Profile_Role">{userDetails.role}</span>
              </div>
            </div>
            <Divider />
            <MenuItem
              onClick={() => redirect("AccSettings")}
              className="Menu_Item"
            >
              <ListItemIcon>
                <RiIcons.RiSettingsLine size={"20px"} className="Menu_Icons" />
              </ListItemIcon>
              Account Settings
            </MenuItem>

            {/* Don't Show if the user is not a dean */}
            {user.role === "Dean" && (
              <MenuItem
                onClick={() => redirect("SysSettings")}
                className="Menu_Item"
              >
                <ListItemIcon>
                  <LuIcons.LuSettings2 size={"20px"} className="Menu_Icons" />
                </ListItemIcon>
                System Settings
              </MenuItem>
            )}

            <MenuItem onClick={() => logout()} className="Menu_Item">
              <ListItemIcon>
                <IoIcons.IoIosLogOut size={"20px"} className="Menu_Icons" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}

      {/* Admin Navbar */}
      {userDetails && userDetails.role === "Admin" && (
        <div className="Navbar_Date_and_Profile">
          {/* Date and Time */}
          <Typography className="Navbar_Date" sx={{ minWidth: "100px" }}>
            <IoIcons.IoMdCalendar
              size={"30px"}
              style={{ marginRight: "10px" }}
            />
            <span className="Date_time">
              <span>{DateTime().date}</span>
              <span className="dot">&#183;</span>
              <span>{DateTime().time}</span>
            </span>
          </Typography>

          <Typography
            className="Navbar_Date_and_Profile_Role"
            sx={{ minWidth: "75px" }}
          >
            {userDetails.role}
          </Typography>

          {/* Account Menu */}
          <Tooltip title="Menu">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src={`https://res.cloudinary.com/${cloudname}/image/upload/fl_attachment/v1711537358/${user.profilePic}`}
                className="Avatar"
              >
                {user.profilePic ? null : firstLetterOfName}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="Navbar_Menu"
            open={open}
            onClose={handleClose}
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
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => logout()} className="Menu_Item">
              <ListItemIcon>
                <IoIcons.IoIosLogOut size={"20px"} className="Menu_Icons" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </section>
  );
}

export default Navbar;
