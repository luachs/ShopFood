const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./config/db");

const productRoutes = require("./routes/RoutesProduct");
const categoryRouter = require("./routes/RoutesCategory");
const blogRouter = require("./routes/RoutesBlog");
const authRouter = require("./routes/RoutesAuth");
const userRouter = require("./routes/RoutesUser");

dotenv.config();

// ✅ Tăng giới hạn body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
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

module.exports = app;
