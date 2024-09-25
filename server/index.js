require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./router/userRoutes");
const authRoutes = require("./router/authRoutes");

app.use(express.json());

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
    sucesss: false,
    message,
    statusCode,
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
