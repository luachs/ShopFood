const express = require("express");
const router = express.Router();

const { controllerSearch } = require("../controllers/controllerSearch");

// 🔍 Search tổng hợp
router.get("/", controllerSearch);

module.exports = router;
