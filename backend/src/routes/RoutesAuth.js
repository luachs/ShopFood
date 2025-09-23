const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/controllerAuth");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { refresh } = require("../controllers/controllerRefresh");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// 🟢 route cần token
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Lấy thông tin user thành công",
    user: req.user, // được gắn trong authMiddleware
  });
});

module.exports = router;
