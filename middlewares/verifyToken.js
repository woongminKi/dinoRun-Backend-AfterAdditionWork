const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGE } = require("../utils/tokenInfo");
const { EXPIRED_TOKEN, MALFORMED_TOKEN } = require("../utils/constants");

async function verifyToken(req, res, next) {
  let accessToken = null;
  let refreshToken = null;

  if (req.body.headers) {
    accessToken = req.body.headers.accessAuthorization;
    refreshToken = req.body.headers.refreshAuthorization;
  } else {
    accessToken = req.headers.accessauthorization;
    refreshToken = req.headers.refreshauthorization;
  }

  try {
    const accessDecode = jwt.verify(accessToken, process.env.SECRET_KEY);

    if (accessDecode) {
      req.user = accessDecode;
      res.cookie = "";

      next();
    }
  } catch (err) {
    try {
      const refreshDecode = jwt.verify(refreshToken, process.env.SECRET_KEY);

      if (refreshDecode) {
        res.cookie = refreshDecode;

        next();
      }
    } catch (err) {
      if (err.message === ERROR_MESSAGE.jwtMalformed) {
        next(createError(403, EXPIRED_TOKEN));
      }

      if (err.message === ERROR_MESSAGE.jwtExpired) {
        next(createError(403, MALFORMED_TOKEN));
      }
    }
  }
}

module.exports = verifyToken;
