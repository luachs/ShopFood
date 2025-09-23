const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer token"
  if (!token) return res.status(401).json({ message: "Không có token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // gắn user vào request
    next();
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
};

module.exports = { authMiddleware };
