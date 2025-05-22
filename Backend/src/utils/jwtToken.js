const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();
//const JWT_SECRET = bsdkfgdbjvbgduhdhuvdb || "your_jwt_secret";

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken };
