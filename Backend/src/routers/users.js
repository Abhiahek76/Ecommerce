import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
//import { uploadImage } from "../Controllers/users.controller.js";
//import authMiddleware from "../middlewares/authMiddleware.js"; // Ensure user is logged in
import {
  registerController,
  verificationEmailController,
  loginController,
  logoutController,
  updateUserController,
  forgotPasswordController,
  verifyForgotPasswordOtpController,
  resetPasswordController,
  uploadImage,
  getAllUserProfiles,
  getUserProfile,
} from "../Controllers/users.controller.js";

const router = express.Router();

// User Registration Route
router.post("/register", registerController);
router.post("/verifition", verificationEmailController);
router.post("/login", loginController);
router.post("/logout", authenticateUser, logoutController);
router.put("/update-user", authenticateUser, updateUserController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtpController);
router.post("/reset-password", resetPasswordController);
//router.post("/refresh-token", refreshTokenController);
// Upload user avatar
router.post(
  "/upload-avatar",
  authenticateUser,
  upload.single("avatar"),
  uploadImage
);
router.get("/profiles", getAllUserProfiles);
router.get("/profile", authenticateUser, getUserProfile);
export default router;
