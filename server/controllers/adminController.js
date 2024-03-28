import asyncHandler from "express-async-handler";
import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import generateOTP from "../utils/generateOTP.js";
import { otpEmailTemplate } from "../utils/otpEmailTemplate.js";
import mailer from "../utils/mailer.js";
import { promises as fs } from "fs";

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME, // Expires in one year
  });
};

const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const q = `SELECT * FROM users WHERE email = '${username}' LIMIT 1`;

  try {
    const [rows, fields] = await db.query(q);
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password." });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password." });
    }

    const token = generateToken(user.user_id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      user_id: user.user_id,
      role: user.role,
      email: user.email,
      profilePic: user.profile_Pic,
      full_Name: user.full_Name,
      date_Created: user.date_Created,
      status: user.status,
      token,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res
      .status(500)
      .json({ errorMessage: "An error occurred while signing in." });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  const q = `DELETE FROM users WHERE user_id = '${user_id}'`;

  db.query(q, async (err, user) => {
    if (err) res.json({ success: false });

    if (user.affectedRows > 0) {
      res.status(200).json({ success: true });
    }
  });
});

export { signIn, deleteUser };
