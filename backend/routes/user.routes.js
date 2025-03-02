import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getUserInfo, updateUserInfo, uploadAvatar } from "../controllers/user.controller.js";

const router = express.Router();

// Lấy danh sách người dùng cho sidebar
router.get("/", protectRoute, getUsersForSidebar);

// Lấy thông tin người dùng
router.get("/:id", protectRoute, getUserInfo);

// Cập nhật thông tin người dùng
router.put("/:id", protectRoute, uploadAvatar, updateUserInfo);

export default router;