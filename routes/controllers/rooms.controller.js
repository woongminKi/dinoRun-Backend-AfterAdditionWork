const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Room = require("../../models/Room");
const { TOKEN } = require("../../utils/tokenInfo");
const {
  REGISTER_ROOM_INFO_SUCCESS,
  REGISTER_ROOM_INFO_FAIL,
  GET_ROOM_INFO_FAIL,
  DELETE_ROOM_INFO_SUCCESS,
  NOT_FOUND,
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
    next(createError(500, { message: GET_ROOM_INFO_FAIL }));
  }
};

exports.registerRoom = async (req, res, next) => {
  const { id } = req.params;
  const userId = id;

  const { title, userObj } = req.body;
  const { displayName } = userObj;

  try {
    await Room.create([
      {
        author: {
          id: userId,
          name: displayName,
        },
        roomInfo: {
          title,
          participants: [
            {
              userId,
              displayName,
            },
          ],
        },
      },
    ]);

    res.status(200).send({ result: REGISTER_ROOM_INFO_SUCCESS });
  } catch (err) {
    next(createError(500, { message: REGISTER_ROOM_INFO_FAIL }));
  }
};

exports.deleteRoom = async (req, res, next) => {
  const { _id } = req.body.targetRoom;

  try {
    await Room.findOneAndDelete({ _id }).lean().exec();
    const roomArray = await Room.find().lean().exec();

    res
      .status(200)
      .send({ result: DELETE_ROOM_INFO_SUCCESS, remainRooms: roomArray });
  } catch (err) {
    next(createError(404, NOT_FOUND));
  }
};
