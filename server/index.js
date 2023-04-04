const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true,
  },
});

const userIo = io.of("/user");

userIo.on("connection", (socket) => {
  console.log("connected user namespace with username", +socket.username);
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    console.log(socket.username);
    next();
  } else {
    next(new Error("Please send token"));
  }
});

function getUsernameFromToken(token) {
  return token;
}

instrument(io, {
  auth: false,
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });

  socket.on("ping", (n) => console.log(n));
});

httpServer.listen(3000);
