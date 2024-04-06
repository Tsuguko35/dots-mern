import asyncHandler from "express-async-handler";
import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import generateOTP from "../utils/generateOTP.js";
import { otpEmailTemplate } from "../utils/otpEmailTemplate.js";
import mailer from "../utils/mailer.js";
import { createReadStream, promises as fs, unlink } from "fs";
import cloudinary from "../config/cloudinary.js";
import { profile } from "console";
import client from "../config/client.js";

dotenv.config();

var otpCode;
var otpExpirationTime;
var userEmailAddress;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME, // Expires in one year
  });
};

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const q = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;

  db.query(q, async (err, user) => {
    if (err)
      return res
        .status(400)
        .json({ errorMessage: "Something went wrong. Try Again." });

    console.log(user);
    if (user && user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      console.log(passwordMatch, user[0].user_id);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errorMessage: "Invalid email or password." });
      } else {
        const token = generateToken(user[0].user_id);

        return res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        return res.status(200).json({
          user_id: user[0].user_id,
          role: user[0].role,
          email: user[0].email,
          profilePic: user[0].profile_Pic,
          full_Name: user[0].full_Name,
          date_Created: user[0].date_Created,
          status: user[0].status,
          token,
        });
      }
    } else {
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password." });
    }
  });
});

const validateUser = asyncHandler(async (req, res) => {
  // Token

  let token = req.cookies.token || req.body.token;

  try {
    if (!token) {
      return res.status(400).json({ errorMessage: "Not Authorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const q = `SELECT * FROM users WHERE user_id = '${decode.id}' LIMIT 1`;
    db.query(q, async (err, user) => {
      if (err) return res.status(400).json({ errorMessage: "Query Error" });
      if (user && user.length > 0) {
        return res.status(200).json({
          user_id: user[0].user_id,
          role: user[0].role,
          email: user[0].email,
          profilePic: user[0].profile_Pic,
          full_Name: user[0].full_Name,
          date_Created: user[0].date_Created,
          status: user[0].status,
          token,
        });
      } else {
        return res.status(400).json({ errorMessage: "Invalid Token." });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errorMessage: "Not authorized." });
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  try {
    return res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errorMessage: "Something went wrong." });
  }
});

const isEmailRegistered = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const q = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;

  db.query(q, async (err, user) => {
    if (err) return res.status(400).json({ errorMessage: "Query Error" });
    if (user && user.length > 0) {
      return res.status(200).json({
        exist: true,
      });
    } else {
      return res.status(200).json({
        exist: false,
      });
    }
  });
});

const register = asyncHandler(async (req, res) => {
  const { email, password, fullName } = req.body;
  const uniqueID = uuidv4();
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const q =
    "INSERT INTO users (`user_id`, `email`, `password`, `full_Name`, `role`, `date_Created`, `status`) VALUES (?)";

  const values = [
    uniqueID,
    email,
    hashedPassword,
    fullName,
    "Faculty",
    new Date(),
    "Pending",
  ];

  db.query(q, [values], async (err, user) => {
    if (err) {
      return res.status(400).json({ errorMessage: "Query Error" });
    } else {
      if (user) {
        // User was created successfully
        return res.status(200).json({ success: true });
      } else {
        // User creation failed
        return res.status(400).json({ errorMessage: "User creation failed" });
      }
    }
  });
});

const requestOtp = asyncHandler(async (req, res) => {
  console.log(true);
  const otpData = generateOTP();
  otpCode = otpData.otpCode;
  console.log(otpCode);
  otpExpirationTime = otpData.expirationTime;

  var action = req.body.action;
  var receiver = req.body.receiver;
  var subject = "Verify Email Address";
  var body = otpEmailTemplate(action, otpCode);

  await mailer({ receiver, subject, body })
    .then(() => {
      console.log("sent");
      return res.status(200).json({
        status: "success",
      });
    })
    .catch((error) => {
      return res.status(400);
    });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otpCodeInput } = req.body;

  console.log(otpCodeInput, otpCode);

  if (new Date().getTime() > otpExpirationTime) {
    res
      .status(400)
      .json({ success: false, errorMessage: "OTP code has expired." });
  }

  if (otpCodeInput == otpCode) {
    return res.status(200).json({ success: true });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: "Invalid OTP code." });
  }
});

const resetUserPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const q = "UPDATE users SET `password` = ? WHERE email = ?";

  const values = [hashedPassword];

  db.query(q, [...values, email], async (err, user) => {
    if (err) {
      return res.status(400).json({ errorMessage: "Query Error" });
    } else {
      if (user) {
        // User was created successfully
        return res.status(200).json({ success: true });
      } else {
        // User creation failed
        res
          .status(400)
          .json({ errorMessage: "Reset password failed. Try again." });
      }
    }
  });
});

const getUsers = asyncHandler(async (req, res) => {
  let q = `SELECT * FROM users`;

  db.query(q, async (err, users) => {
    if (err) return res.status(400).json({ errorMessage: "Query Error" });

    if (users && users.length > 0) {
      return res.status(200).json({ hasData: true, users: users });
    } else {
      return res.status(200).json({ hasData: false });
    }
  });
});

const changeUserStatus = asyncHandler(async (req, res) => {
  const { user_id, status } = req.body;

  const q = "UPDATE users SET `status` = ? WHERE user_id = ?";

  const values = [status];

  db.query(q, [...values, user_id], async (err, user) => {
    if (err) {
      return res.status(400).json({ errorMessage: "Query Error" });
    } else {
      if (user) {
        // User was created successfully
        return res.status(200).json({ success: true });
      } else {
        // User creation failed
        res
          .status(400)
          .json({ errorMessage: "Failed changing the user status." });
      }
    }
  });
});

const registerStaff = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  const uniqueID = uuidv4();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const q =
    "INSERT INTO users (`user_id`, `email`, `password`, `role`, `date_Created`, `status`) VALUES (?)";

  const values = [
    uniqueID,
    email,
    hashedPassword,
    role,
    new Date(),
    "Temporary",
  ];

  db.query(q, [values], async (err, user) => {
    if (err) {
      return res.status(400).json({ errorMessage: "Query Error" });
    } else {
      if (user) {
        // User was created successfully
        return res.status(200).json({ success: true });
      } else {
        // User creation failed
        return res.status(400).json({ errorMessage: "Staff creation failed" });
      }
    }
  });
});

const finishStaffSetup = asyncHandler(async (req, res) => {
  const { user_id, full_Name, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const q =
    "UPDATE users SET `full_Name` = ?, `password` = ?, `status` = ? WHERE user_id = ?";

  const values = [full_Name, hashedPassword, "Active"];

  db.query(q, [...values, user_id], async (err, user) => {
    if (err) {
      return res.status(400).json({ errorMessage: "Query Error" });
    } else {
      if (user) {
        // User was created successfully
        return res.status(200).json({ success: true });
      } else {
        // User creation failed
        res
          .status(400)
          .json({ errorMessage: "Failed changing the user status." });
      }
    }
  });
});

const uploadUserProfilePic = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  const profilePic = req.files[0];

  const selectQuery = "SELECT profile_Pic FROM users WHERE user_id = ?";
  db.query(selectQuery, [user_id], async (err, result) => {
    if (err) {
      return res.status(400).json({ errorMessage: "Query Error" });
    } else {
      // If user has an existing profile picture, delete it from storage
      const existingProfilePic = [result[0].profile_Pic];
      if (existingProfilePic) {
        const filePath = `/userFiles/profilePics/${existingProfilePic}`;
        client.delete(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully:", filePath);
          }
        });
      }

      // Update the profile_Pic field with the new file
      const updateQuery = "UPDATE users SET profile_Pic = ? WHERE user_id = ?";
      db.query(updateQuery, [profilePic.filename, user_id], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ errorMessage: "Query Error" });
        } else {
          if (result.affectedRows > 0) {
            const localFilePath = profilePic.path;
            const remoteFilePath = `userFiles/profilePics/${profilePic.filename}`;
            const fileContent = createReadStream(localFilePath);
            // Upload the file to Hostinger FTP server
            client.put(fileContent, remoteFilePath, (err) => {
              if (err) {
                console.error("Error uploading file:", err);
              } else {
                console.log("File uploaded successfully");
                // Delete the file locally after successful upload
                unlink(localFilePath, (err) => {
                  if (err) {
                    console.error(
                      "Error deleting local file:",
                      localFilePath,
                      err
                    );
                  } else {
                    console.log(
                      "Local file deleted successfully:",
                      localFilePath
                    );
                  }
                });
              }
            });

            return res.status(200).json({ success: true });
          } else {
            res
              .status(400)
              .json({ errorMessage: "Profile picture update failed." });
          }
        }
      });
    }
  });
});

export {
  signIn,
  validateUser,
  logOutUser,
  isEmailRegistered,
  register,
  requestOtp,
  verifyOtp,
  resetUserPassword,
  getUsers,
  changeUserStatus,
  registerStaff,
  finishStaffSetup,
  uploadUserProfilePic,
};
