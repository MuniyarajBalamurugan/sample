const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
    cloud_name: "dv4drdjoh",           // ONLY your cloud name
    api_key: "412998456813347",
    api_secret: "PVKzutyo7xdE78bIJMSABCvl9d4"
});

module.exports = cloudinary;
