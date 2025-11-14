const express = require("express");
const mongoose = require("mongoose");

//mongoose.connect("mongodb+srv://neesmu:neesmu2005@cluster0.cnxqlf2.mongodb.net/?appName=Cluster0")
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
    try {
        console.log("Received Webhook:", req.body);

        const data = {
            name: req.body.session?.name?.value || null,
            email: req.body.session?.mail?.value || null,
            handler: req.body.handler,
            request: req.body.request,
            environment: req.body.environment,
            component: req.body.component,
            context: req.body.context,
            raw: req.body
        };

        const user = await User.create(data);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// READ ALL USERS
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// READ ONE USER
app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// UPDATE USER
app.put("/users/:id", async (req, res) => {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // return updated user
    );
    res.json(updated);
});

// DELETE USER
app.delete("/users/:id", async (req, res) => {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted", deleted });
});

// SERVER
//app.listen(3000, () => console.log("Server running on port 3000"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

