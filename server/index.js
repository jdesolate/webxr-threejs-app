const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("Server is running and listening on *:3000");
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
