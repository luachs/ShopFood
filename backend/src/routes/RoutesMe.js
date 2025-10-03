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

router.get("/profile", authMiddleware, getProfile); // allow all
router.get("/profile/:id/public", getPublicProfile);

router.put(
  "/profile",
  authMiddleware,
  authorizeMiddleware("edit_self"),
  updateProfile
);
router.put(
  "/change-password",
  authMiddleware,
  authorizeMiddleware("edit_self"),
  changePassword
);

module.exports = router;
