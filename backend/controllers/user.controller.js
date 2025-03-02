import User from "../models/user.model.js";
import multer from "multer";
import path from "path";

// Cấu hình multer để lưu trữ tệp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware để xử lý tệp tải lên
export const uploadAvatar = upload.single("profilePic");

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId} }).select("-passWord");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar:", error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

// Lấy thông tin người dùng
export const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-passWord"); // Loại bỏ trường passWord
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Cập nhật thông tin người dùng
export const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    if (req.file) {
      updates.profilePic = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-passWord");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};