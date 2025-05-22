import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateUser = (req, res, next) => {
  try {
    // Check cookie or Authorization header
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Get just the token
      }
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized, invalid token" });
      }

      if (!decoded.id) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      req.userId = decoded.id; // Attach user ID to request
      next();
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
