const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema([
  {
    id: mongoose.Schema.Types.ObjectId,
    author: {
      id: mongoose.Schema.Types.ObjectId,
      name: {
        type: String,
      },
    },
    roomInfo: {
      title: {
        type: String,
      },
      participants: [
        {
          userId: {
            type: String,
          },
          displayName: {
            type: String,
          },
        },
      ],
    },
  },
]);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
