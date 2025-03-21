const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static("public"));

// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for chat messages
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg); // Broadcast the message to all users
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});