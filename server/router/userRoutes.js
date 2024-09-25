const express = require("express");
const router = express.Router();
const { test } = require("../controllers/userControllers");

router.get("/", test);

module.exports = router;
