import React, { useContext, useEffect, useState } from "react";
import { PageHeader } from "../../components";
import "../../styles/account_settings.css";
import { Avatar } from "@mui/material";

// Icons
import * as CiIcons from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/context";
import { addProfilePic } from "../../utils";
import toast from "react-hot-toast";
import { domain, profile_Pic } from "../../constants";
import { validateUser } from "../../context";

function Account_Settings() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(NotificationContext);

  const userDetails = user;
  const firstLetterOfName = userDetails.full_Name
    ? userDetails.full_Name.charAt(0).toUpperCase()
    : "A";

  const [profilePic, setProfilePic] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const handleSubmit = async () => {
    toast.loading("Please wait...");
    if (profileFile) {
      const res = await addProfilePic({
        file: profileFile,
        user_id: user.user_id,
      });
      toast.dismiss();

      if (res?.status === 200) {
        const token = window.localStorage.getItem("user");
        const validateRes = await validateUser({ token });
        if (validateRes?.status === 200) {
          toast.success("User settings saved successfully.");
          setUser(validateRes?.data);
        } else {
          toast.error("Error refreshing user details. refresh the page.");
        }
      } else {
        toast.error(res?.errorMessage);
      }
    } else {
      toast.dismiss();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileFile(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    document.title = `Account Settings`;
  }, []);

  return (
    <section id="Account_Settings" className="Account_Settings">
      <div className="wrapper">
        <PageHeader page={"Account Settings"} />
        <div className="Settings_Container">
          <div className="Left-Side">
            <div className="Profile_Pic">
              <Avatar
                src={
                  !profilePic ? `${profile_Pic}/${user.profilePic}` : profilePic
                }
                className="Pic"
              >
                {user.profilePic || profilePic ? null : firstLetterOfName}
              </Avatar>
              <div className="Pic_Change_Holder">
                <div className="Pic_Change">
                  <CiIcons.CiImageOn size={"30px"} />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png"
                  />
                </div>
              </div>
            </div>
            <div className="Profile_Name_Role">
              <div className="Name">
                <p>{userDetails.full_Name}</p>
              </div>
              <div className="Email">
                <p>{userDetails.email}</p>
              </div>
              <div className="Role">
                <p>{userDetails.role}</p>
              </div>
            </div>
          </div>
          <div className="Right-Side">
            <div className="Label">General Info</div>
            <div className="Info_Holder">
              <div className="Info">
                <div className="Info_Label">
                  <span>Name</span>
                </div>
                <div className="Info_Value">
                  <div className="Value">
                    <p>{userDetails.full_Name}</p>
                  </div>
                </div>
              </div>
              <div className="Info">
                <div className="Info_Label">
                  <span>Email</span>
                </div>
                <div className="Info_Value">
                  <div className="Value">
                    <p>{userDetails.email}</p>
                  </div>
                </div>
              </div>
              <div className="Info">
                <div className="Info_Label">
                  <span>Password</span>
                </div>
                <div className="Info_Value">
                  <div className="Value Password">
                    <p>**********</p>
                  </div>
                  <div
                    className="Info_Edit"
                    onClick={() => navigate("/Reset-Password")}
                  >
                    <span>Change Password</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="Save_Profile">
              <button onClick={() => handleSubmit()}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account_Settings;
