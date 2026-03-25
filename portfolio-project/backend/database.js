const fs = require("fs");
const path = require("path");

// File path
const DATA_FILE = path.join(__dirname, "messages.json");

// Ensure file exists
function initDB() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
}

// Read all messages
function getMessages() {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Save a new message
function saveMessage(messageData) {
    const messages = getMessages();

    const newMessage = {
        id: Date.now(),
        ...messageData,
        date: new Date()
    };

    messages.push(newMessage);

    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

    return newMessage;
}

module.exports = {
    initDB,
    getMessages,
    saveMessage
};