import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String, default: "" },
    mobile: { type: String, default: "", required: false },
    refresh_token: { type: String, default: "" },
    verify_email: { type: Boolean, default: false },
    last_login_date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
    address_details: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    shopping_cart: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CartProduct" },
    ],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    forgot_password_otp: { type: String, default: null },
    forgot_password_expiry: { type: Date, default: "" },
    role: {
      type: String,
      enum: ["User", "Admin", "Vendor"],
      default: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
