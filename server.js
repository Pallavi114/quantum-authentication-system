const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to MongoDB with a retry mechanism
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`[${new Date().toISOString()}] ✅ MongoDB Connected`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ MongoDB Connection Error:`, err);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};
connectDB();

// Import and mount authentication routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // Handles /api/auth/register, /api/auth/login, etc.

// Root Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  console.error(`[${new Date().toISOString()}] ❌ Uncaught Exception:`, err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(`[${new Date().toISOString()}] ❌ Unhandled Rejection:`, err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] 🚀 Server is running on port ${PORT}`);
});
