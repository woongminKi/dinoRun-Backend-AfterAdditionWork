const socketIO = require("socket.io");
const User = require("../models/User");
const Room = require("../models/Room");

module.exports = (server) => {
  const io = socketIO(server, {
    path: "/socket.io",
    cors: {
      origin: process.env.DINORUN_CLIENT_URL,
    },
  });

  io.on("connection", (socket) => {
    console.log("새로운 유저 접속: ", socket.id);

    socket.on("disconnect", () => {
      console.log("유저 접속 해제: ", socket.id);
    });

    socket.on("error", (err) => {
      console.error(err);
    });

    socket.on("waitJoinRoom", async (user) => {
      try {
        socket.broadcast.emit("waitJoinRoom", user);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("joinRoom", async (roomId, user) => {
      try {
        const currentRoom = await Room.findById(roomId);

        currentRoom.roomInfo.participants.push(user);
        await currentRoom.save();

        socket.join(roomId);
        socket.to(roomId).emit("joinRoom", user);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("makeRoom", async (roomData) => {
      try {
        io.emit("makeRoom", roomData);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("checkAnotherPlayerEntered", async (user) => {
      try {
        const userDbData = await User.find().lean().exec();

        socket.broadcast.emit("checkAnotherPlayerEntered", user, userDbData);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("gameStart", async (id) => {
      const roomId = id;

      try {
        await Room.findByIdAndDelete(roomId);

        io.emit("gameStart", roomId);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("gameScore", (score) => {
      try {
        socket.broadcast.emit("gameScore", score);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("leaveRoom", async (roomId, user) => {
      try {
        socket.to(roomId).emit("leaveRoom", user);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("deleteRoom", async (roomId) => {
      try {
        await Room.findByIdAndDelete(roomId);

        socket.broadcast.emit("deleteRoom");
      } catch (err) {
        console.error(err);
      }
    });
  });
};
