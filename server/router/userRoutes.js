const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/verifyUser");
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.get("/", getAllUsers);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
