const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGE } = require("../utils/tokenInfo");
const { EXPIRED_TOKEN, MALFORMED_TOKEN } = require("../utils/constants");

async function verifyToken(req, res, next) {
  const accessToken = req.headers.accessauthorization;
  const refreshToken = req.headers.refreshauthorization;

  try {
    const accessDecode = jwt.verify(accessToken, process.env.SECRET_KEY);

    if (accessDecode) {
      req.user = accessDecode;

      next();
    }
  } catch(err) {
    if (err.message === ERROR_MESSAGE.jwtExpired) {
      try {
        const refreshDecode = jwt.verify(refreshToken, process.env.SECRET_KEY);

        if (refreshDecode) {
          req.cookie = refreshDecode;

          next();
        }
      } catch(err) {
        if (err.message === ERROR_MESSAGE.jwtMalformed) {
          next(createError(403, EXPIRED_TOKEN));
        }

        if (err.message === ERROR_MESSAGE.jwtExpired) {
          next(createError(403, MALFORMED_TOKEN));
        }
      }
    }
  }
}

module.exports = verifyToken;
