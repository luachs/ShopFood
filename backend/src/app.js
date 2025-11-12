const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

const db = require("./config/db");

const productRoutes = require("./routes/RoutesProduct");
const categoryRouter = require("./routes/RoutesCategory");
const blogRouter = require("./routes/RoutesBlog");
const authRouter = require("./routes/RoutesAuth");
const userRouter = require("./routes/RoutesUser");
const meRouter = require("./routes/RoutesMe");
const permissionRouter = require("./routes/RoutesPermission");
const permissionGroupRouter = require("./routes/permissionGroupRoutes");
const roleRouter = require("./routes/roleRoutes");
const searchRouter = require("./routes/searchRoutes");
const CartRouter = require("./routes/routesCart");

dotenv.config();

// ✅ Tăng giới hạn body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Cookie + CORS
app.use(cookieParser());

// ✅ Cho phép frontend và admin truy cập API
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// static files
app.use("/images", express.static("uploads/images"));

//routes
app.get("/", (req, res) => {
  res.send("Express App is running ");
});
app.use("/products", productRoutes);
app.use("/categories", categoryRouter);
app.use("/blogs", blogRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/me", meRouter);
app.use("/permission", permissionRouter);
app.use("/permission-groups", permissionGroupRouter);
app.use("/roles", roleRouter);
app.use("/search", searchRouter);
app.use("/cart", CartRouter);

module.exports = app;
