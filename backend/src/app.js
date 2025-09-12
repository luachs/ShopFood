const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const db = require("./config/db");

const productRoutes = require("./routes/RoutesProduct");

app.use(express.json());
app.use(cors());
app.use("/images", express.static("uploads/images"));

//routes
app.get("/", (req, res) => {
  res.send("Express App is running ");
});

app.use("/products", productRoutes);

module.exports = app;


