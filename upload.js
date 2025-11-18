const multer = require("multer");
const { CloudinaryStorage } = require("@cloudinary/multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // your config

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",          // folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

const upload = multer({ storage });

module.exports = upload;
