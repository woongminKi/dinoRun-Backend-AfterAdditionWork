const createError = require("http-errors");
const User = require("../../models/User");

const {
  GET_USER_INFO_FAIL,
  ALREADY_JOINED_USER,
  USER_JOIN_SUCCESS,
} = require("../../utils/constants");

exports.getUser = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email }).lean().exec();

    res.status(200).send({ user });
  } catch (err) {
    next(createError(500, { message: GET_USER_INFO_FAIL }));
  }
};

exports.signIn = async (req, res, next) => {
  const { email, displayName, photoURL } = req.body;

  try {
    const user = await User.findOne({ email }).lean().exec();

    if (user) {
      return res.status(201).send({ result: ALREADY_JOINED_USER });
    }

    await User.create({
      email,
      displayName,
      imageUrl: photoURL,
    });

    res.status(201).send({ result: USER_JOIN_SUCCESS });
  } catch (err) {
    next(createError(500, { message: GET_USER_INFO_FAIL }));
  }
};
