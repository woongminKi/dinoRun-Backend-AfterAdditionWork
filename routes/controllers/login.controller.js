const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { TOKEN } = require("../../utils/tokenInfo");

const {
  GET_USER_INFO_FAIL,
  ALREADY_JOINED_USER,
  USER_JOIN_SUCCESS,
} = require("../../utils/constants");

exports.getUser = async (req, res, next) => {
  const { email, name } = req.user;
  const userInfo = { email, name };

  try {
    const user = await User.findOne({ email }).lean().exec();

    const accessToken = await jwt.sign(userInfo, process.env.SECRET_KEY, {
      expiresIn: TOKEN.accessTokenLimit,
    });

    const refreshToken = jwt.sign(userInfo, process.env.SECRET_KEY, {
      expiresIn: TOKEN.refreshTokenLimit,
    });

    res.status(200).send({ user, accessToken, refreshToken });
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
