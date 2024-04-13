import express from "express";
import {
  changeRole,
  deleteUser,
  signIn,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/deleteUser", deleteUser);
router.post("/changeRole", changeRole);

export default router;
