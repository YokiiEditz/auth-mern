require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./router/userRoutes");

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.log(error));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
