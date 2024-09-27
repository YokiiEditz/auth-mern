const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/verifyUser");
const {
  test,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.get("/ ", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
