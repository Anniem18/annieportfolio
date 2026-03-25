const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(bodyParser.json());

// ===== SIMPLE DATABASE =====
const DATA_FILE = "messages.json";

// Create file if not exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// ===== ROUTES =====

// Home route
app.get("/", (req, res) => {
    res.send("🚀 Portfolio Backend Running...");
});

// Contact API
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        });
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    const newMessage = {
        id: Date.now(),
        name,
        email,
        message,
        date: new Date()
    };

    data.push(newMessage);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({
        success: true,
        message: "Message received successfully!"
    });
});

// Get messages
app.get("/messages", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// Start server
app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});