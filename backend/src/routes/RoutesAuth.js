const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/controllerAuth");
const { refresh } = require("../controllers/controllerRefresh");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
