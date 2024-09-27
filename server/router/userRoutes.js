const express = require("express");
const router = express.Router();
const { test, updateUser } = require("../controllers/userControllers");
const verifyToken = require("../utilities/verifyUser");

router.get("/ ", test);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
