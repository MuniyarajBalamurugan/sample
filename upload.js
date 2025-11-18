const multer = require("multer");
//const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary-v2");

const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ecommerce_products",   // Cloudinary folder name
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});

const upload = multer({ storage });

module.exports = upload;
