const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const upload = require("./src/middlewares/multer/index");
const db = require("./src/config/db");

// static
app.use("/images", express.static("uploads/images"));

//routes
app.get("/", (req, res) => {
  res.send("Express App is running ");
});

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: "true",
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// listen
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running localhost:${port} `);
  } else {
    console.log("Error:" + error);
  }
});
