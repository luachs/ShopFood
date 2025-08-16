const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./src/config/db");
const upload = require("./src/middlewares/multer/index");

app.use(express.json());
app.use(cors());
app.use("/images", express.static("uploads/images"));

//routes
app.get("/", (req, res) => {
  res.send("Express App is running ");
});

// image storage engine
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  res.json({
    success: true,
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
