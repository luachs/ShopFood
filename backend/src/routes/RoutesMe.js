const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  getPublicProfile,
} = require("../controllers/controllerMe");

// ✅ Chỉ cho phép chính mình (hoặc admin) sửa
const allowSelfOnly = (req, res, next) => {
  const user = req.user;
  const targetId = req.params.id || req.body._id || req.user._id;

  // nếu là chính mình
  if (user._id.toString() === targetId.toString()) return next();

  // nếu là admin (authorizeMiddleware sẽ cho phép luôn)
  return res
    .status(403)
    .json({ message: "Chỉ chính bạn (hoặc admin) được phép thao tác" });
};

router.get("/profile", authMiddleware, getProfile); // allow all
router.get("/profile/:id/public", getPublicProfile);

router.put(
  "/profile",
  authMiddleware,
  allowSelfOnly,
  authorizeMiddleware("EDIT_SELF"),
  updateProfile
);
router.put(
  "/change-password",
  authMiddleware,
  allowSelfOnly,
  authorizeMiddleware("EDIT_SELF"),
  changePassword
);

module.exports = router;
