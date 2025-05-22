import User from "../models/user.models.js"; // user database
import bcrypt from "bcrypt"; // access Env file
import dotenv from "dotenv";
dotenv.config(); // Load .env variables
import sendEmail from "../Config/sendemail.js"; // Use only one import sendemail
import verifyTemplate from "../utils/verifyTamplet.js"; // Email Tamplete
import resetverifyTemplate from "../utils/resetverifyTamplet.js"; // resent otp email tamplte
import validator from "validator"; // Email validatar
import jwt from "jsonwebtoken"; // add jwt token
import cloudinary from "../Config/cloudinary.js"; //import cloudinary config
// Email Controller...
export async function verificationEmailController(req, res) {
  try {
    const { code } = req.query; // Get verification code from URL

    if (!code) {
      return res.status(400).json({ message: "Verification code is missing" });
    }

    // Find user with the provided code
    const user = await User.findOne({ _Id: code });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification code" });
    }

    // Check if the email is already verified
    if (user.verify_email) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Update user to set email as verified
    user.verify_email = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error in email verification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// Function to generate Access Token...
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Changed `userId` to `id`
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
};
// Updet controler...
export const updateUserController = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from middleware

    console.log("User ID:", userId); // Debugging step

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { name, email, phone, password } = req.body;
    let updatedFields = { name, email, phone };

    // Hash new password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// import validator from "validator"...;
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Input validation
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    console.log("Received password reset request for:", email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiry time (valid for 15 minutes)
    user.forgot_password_otp = otp;
    user.forgot_password_expiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Send OTP via email
    await sendEmail({
      sendTo: email,
      subject: "your forget password",
      html: resetverifyTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// verify and forget passwort...
export const verifyForgotPasswordOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if email and OTP are provided
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is correct and not expired
    if (
      user.forgot_password_otp !== otp ||
      !user.forgot_password_expiry ||
      user.forgot_password_expiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, return success response
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// reset passwort....
export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate required fields
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save updated password
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// image avtercontroler....
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get userId from auth middleware (set from token)
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Convert file to base64
    const fileStr = `data:image/png;base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "uploads",
    });

    const imageUrl = result.secure_url;

    // Update user's avatar field in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: imageUrl },
      { new: true }
    ).select("-password"); // optional: don't return password

    res.json({
      message: "Image uploaded successfully",
      imageUrl,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
// const { generateAccessToken } = require("../utils/jwtToken.js"); // update path as needed....
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ error: `User already exists with email: ${email}` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false, //optional field for tracking verification
    });

    await newUser.save(); // Save to DB

    // Generate access token
    const accessToken = generateAccessToken(newUser);

    // Set token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //  Verification Email URL (use code or token if needed)
    const verifyEmailUrl = `${process.env.FRONTEND}/verify-email?code=${newUser._id}`;

    //  Send email
    const emailSent = await sendEmail({
      sendTo: [email],
      subject: "Verify Your Email - Ecommerce",
      html: verifyTemplate({
        name: name,
        url: verifyEmailUrl,
      }),
    });

    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    return res.status(201).json({
      message: "User registered successfully! Please verify your email.",
      token: accessToken,
      // message: "User registered successfully! Please verify your email.",
      //token: accessToken,
    });
  } catch (error) {
    console.error(" Error in Register:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// login....
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  Find user directly from DB
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with email ${email}` });
    }

    //  Check password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // (Optional) Check if user is verified
    /*if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }*/

    //  Generate JWT
    const accessToken = generateAccessToken(user);

    //  Set cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({ message: "Login successful", token: accessToken });
  } catch (error) {
    console.error(" Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// logout controller....
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(" Logout Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// Get all user profiles.....
export const getAllUserProfiles = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password field
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
// Get a single user profile (from token -> userId in middleware)....
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // set by auth middleware
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User profile not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
