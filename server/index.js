require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./router/userRoutes");
const authRoutes = require("./router/authRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.log(error));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// const PORT = process.env.PORT || 3002;
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
