const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Hàm tạo storage động
const createStorage = (folderName) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const folder = `./uploads/images/${folderName}`;
      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

// Khai báo 2 loại upload
const uploadProduct = multer({ storage: createStorage("products") });
const uploadBlog = multer({ storage: createStorage("blogs") });

module.exports = { uploadProduct, uploadBlog };
  