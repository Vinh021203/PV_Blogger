import express from "express";
import { getAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers); // ✅ Không yêu cầu token

export default router;
