const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Room = require("../../models/Room");
const { TOKEN } = require("../../utils/tokenInfo");
const {
  REGISTER_ROOM_INFO_SUCCESS,
  REGISTER_ROOM_INFO_FAIL,
  GET_ROOM_INFO_FAIL,
  GET_PARTICIPANT_USER_INFO_FAIL,
} = require("../../utils/constants");

exports.getRoomInfo = async (req, res, next) => {
  if (res.cookie) {
    const { email, name } = res.cookie;
    const newAccessToken = jwt.sign({ email, name }, process.env.SECRET_KEY, {
      expiresIn: TOKEN.accessTokenLimit,
    });
    res.status(200).send({ newAccessToken });
    return;
  }

  try {
    const roomArray = await Room.find().lean().exec();

    res.status(200).send(roomArray);
  } catch (err) {
    next(createError(404, { message: GET_ROOM_INFO_FAIL }));
  }
};

exports.registerRoom = async (req, res, next) => {
  const { title, user } = req.body;
  try {
    await Room.create([
      {
        author: {
          id: user._id,
          name: user.displayName,
        },
        roomInfo: {
          title,
          participants: [],
        },
      },
    ]);

    res.status(200).send({ result: REGISTER_ROOM_INFO_SUCCESS });
  } catch (err) {
    next(createError(404, { message: REGISTER_ROOM_INFO_FAIL }));
  }
};
exports.getRoomPeople = async (req, res, next) => {
  if (res.cookie) {
    const { email, name } = res.cookie;
    const newAccessToken = jwt.sign({ email, name }, process.env.SECRET_KEY, {
      expiresIn: TOKEN.accessTokenLimit,
    });

    res.status(200).send({ newAccessToken });
    return;
  }

  const { roomid } = req.headers;

  try {
    const currentRoom = await Room.findById(roomid);
    const currentRoomPeople = currentRoom.roomInfo.participants;
    res.status(200).send({ currentPeople: currentRoomPeople });
  } catch (err) {
    next(
      createError(404, {
        message: GET_PARTICIPANT_USER_INFO_FAIL,
      })
    );
  }
};
