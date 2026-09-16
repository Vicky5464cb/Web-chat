const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, "public")));

// Keep track of connected users: socket.id -> username
const users = {};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // When a user sets their username
  socket.on("join", (username) => {
    users[socket.id] = username || "Anonymous";
    io.emit("system-message", `${users[socket.id]} joined the chat`);
    io.emit("user-list", Object.values(users));
  });

  // When a chat message is sent
  socket.on("chat-message", (text) => {
    const username = users[socket.id] || "Anonymous";
    const payload = {
      username,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    io.emit("chat-message", payload);
  });

  // Typing indicator
  socket.on("typing", () => {
    const username = users[socket.id] || "Anonymous";
    socket.broadcast.emit("typing", username);
  });

  // On disconnect
  socket.on("disconnect", () => {
    const username = users[socket.id];
    if (username) {
      io.emit("system-message", `${username} left the chat`);
      delete users[socket.id];
      io.emit("user-list", Object.values(users));
    }
    console.log(`Disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
