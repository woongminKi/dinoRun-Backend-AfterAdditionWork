const ROOM_ID = "6228eeec201565b4c9ac4b1c";
const USER_ID = "621cb5881979e82dae2a9e1d";

exports.validMockRoomData = {
  _id: ROOM_ID,
  author: {
    id: USER_ID,
    name: "김디노",
  },
  roomInfo: {
    title: "testMockTitle",
    participants: [
      {
        email: "dinorun@gmail.com",
        displayName: "김디노",
        score: 0,
        imageUrl:
          "https://lh3.googleusercontent.com/a/AATXAJy00YrSOHwxEZ4YAC0sLmkm0zDEjo...",
        _id: USER_ID,
      },
    ],
  },
};

exports.validMockUserData = {
  _id: USER_ID,
  email: "dinorun@gmail.com",
  displayName: "김디노",
  score: 0,
  imageUrl:
    "https://lh3.googleusercontent.com/a/AATXAJy00YrSOHwxEZ4YAC0sLmkm0zDEjo...",
};

exports.validMockRoomArray = [
  {
    _id: ROOM_ID,
    author: {
      id: USER_ID,
      name: "김디노",
    },
    roomInfo: {
      title: "testMockTitle",
      participants: [
        {
          email: "dinorun@gmail.com",
          displayName: "김디노",
          score: 0,
          imageUrl:
            "https://lh3.googleusercontent.com/a/AATXAJy00YrSOHwxEZ4YAC0sLmkm0zDEjo...",
          _id: USER_ID,
        },
      ],
    },
  },
];
