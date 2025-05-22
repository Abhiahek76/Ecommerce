import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgen from "morgan";
import cookieParser from "cookie-parser";
import ConnectDB from "./Config/db.js";

//==========add all routes======================================
import registercontroler from "./routers/users.js";

//==============================================================
dotenv.config();

const app = express();

// Middleware==================================================
app.use(express.json());
app.use(morgen());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTE_ND || "http://localhost:5173",
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cookieParser());
//====================================================
app.use("/api", registercontroler); // Mount user routes

//====================================================

// Connect to MongoDB
ConnectDB();

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
