const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // <-- correct package
const cloudinary = require("./cloudinary"); // your config

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",          // folder name in Cloudinary
    allowedFormats: ["jpg", "jpeg", "png"] // <-- note camelCase
  }
});

const upload = multer({ storage });

module.exports = upload;
