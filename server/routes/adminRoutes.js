import express from "express";
import { deleteUser, signIn } from "../controllers/adminController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/deleteUser", deleteUser);

export default router;
