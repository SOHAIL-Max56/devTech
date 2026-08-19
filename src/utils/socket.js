const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173", "http://98.130.129.15"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    let currentUserId = null; // ✅ Define here - accessible to all handlers

    socket.on("JoinChat", ({ firstName, userId, targetUserId }) => {
      currentUserId = userId; // ✅ Set the value
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName + " joined room " + roomId);
      socket.join(roomId);
    });

    socket.on("SendMessage", ({ firstName, receiverId, text }) => {
      if (!currentUserId) {
        console.log("Error: User hasn't joined a room yet");
        return;
      }

      const roomId = [currentUserId, receiverId].sort().join("_");
      console.log(
        `${firstName}  sending to room  ${text}`,
      );

      io.to(roomId).emit("messageReceived", {
        firstName,
        senderId: currentUserId,
        text
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
