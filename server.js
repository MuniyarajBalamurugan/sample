const express = require("express");
const mysql = require("mysql2");
const upload = require("./upload");   // multer + cloudinary

const app = express();
app.use(express.json());

// DB connection
const db = mysql.createConnection({
    host: "gondola.proxy.rlwy.net",
    user: "root",
    password: "jlDYMucnfwLHXuvtJnkXfeNHZsKVcIIV",
    database: "railway",
    port: 32669
});

// connect the DB
db.connect((err) => {
    if (err) {
        console.log("DB CONNECTION FAILED:", err);
    } else {
        console.log("MySQL Connected Successfully!");
    }
});

// Add Product API
app.post("/add-product", upload.single("image"), (req, res) => {
    const { name, price, stock } = req.body;
    const image_url = req.file.path; // Cloudinary URL

    const query = `INSERT INTO products (name, price, stock, image_url) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, price, stock, image_url], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Product added!", product_id: result.insertId, image_url });
    });
});

// CREATE TABLES ROUTE
app.get("/create-tables", (req, res) => {
    const queries = [
        `CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            phone VARCHAR(20),
            address TEXT
        )`,

        `CREATE TABLE IF NOT EXISTS products (
            product_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10,2),
            stock INT,
            image_url VARCHAR(255)
        )`,

        `CREATE TABLE IF NOT EXISTS orders (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            total_amount DECIMAL(10,2),
            order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            payment_status ENUM('Pending', 'Paid') DEFAULT 'Pending',
            order_status ENUM('Placed', 'Delivered') DEFAULT 'Placed',
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        )`,

        `CREATE TABLE IF NOT EXISTS order_items (
            order_item_id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT,
            product_id INT,
            quantity INT,
            price DECIMAL(10,2),
            FOREIGN KEY (order_id) REFERENCES orders(order_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        )`
    ];

    queries.forEach(query => {
        db.query(query, (err) => {
            if (err) console.log("Error:", err);
        });
    });

    res.send("All COD tables created successfully!");
});

// SERVER START
app.listen(3000, () => {
    console.log("Server running on PORT 3000");
});
