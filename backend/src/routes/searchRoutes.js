const express = require("express");
const router = express.Router();

const {
  controllerSearch,
  controllerSearchSuggest,
} = require("../controllers/controllerSearch");

// 🔍 Search tổng hợp
router.get("/", controllerSearch);
router.get("/suggest", controllerSearchSuggest);

module.exports = router;
