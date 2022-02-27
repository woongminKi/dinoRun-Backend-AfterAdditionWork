const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Room = require("../../models/Room");
const { TOKEN } = require("../../utils/tokenInfo");
const {
  REGISTER_ROOM_INFO_SUCCESS,
  REGISTER_ROOM_INFO_FAIL,
  GET_ROOM_INFO_FAIL,
  DELETE_ROOM_INFO_SUCCESS,
  NOT_FOUND
} = require("../../utils/constants");

exports.getRoomInfo = async (req, res, next) => {
  if (req.cookie) {
    const { email, name } = req.cookie;
    const newAccessToken = jwt.sign({ email, name }, process.env.SECRET_KEY, {
      expiresIn: TOKEN.accessTokenLimit,
    });

    res.status(200).send({ newAccessToken });
    return;
  }

  const { name } = req.user;

  try {
    const room = await Room.findOne({ displayName: name }).lean().exec();

    res.status(200).send({ room });
  } catch(err) {
    next(createError(500, { message: GET_ROOM_INFO_FAIL }));
  }
};

exports.registerRoom = async (req, res, next) => {
  const { title, userObj } = req.body;
  const { id, displayName } = userObj;

  try {
    await Room.create({
      title,
      participants: [{
        userId: id,
        displayName,
      }]
    });

    res.status(200).send({ result: REGISTER_ROOM_INFO_SUCCESS });
  } catch(err) {
    next(createError(500, { message: REGISTER_ROOM_INFO_FAIL }));
  }
};

exports.deleteRoom = async (req, res, next) => {
  const { room } = req.body;
  const title = room.title;

  try {
    await Room.findOneAndDelete({ title }).lean().exec();

    res.status(200).send({ result: DELETE_ROOM_INFO_SUCCESS });
  } catch(err) {
    next(createError(404, NOT_FOUND));
  }
};
