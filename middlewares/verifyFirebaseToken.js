const createError = require("http-errors");
const admin = require("../config/firebase");
const { UNAUTHORIZED_TOKEN, FORBIDDEN } = require("../utils/constants");

async function verifyFirebaseToken(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decode = await admin.auth().verifyIdToken(token);

    if (decode) {
      req.user = decode;

      next();
    } else {
      next(createError(500, UNAUTHORIZED_TOKEN));
    }
  } catch (err) {
    next(createError(403, FORBIDDEN));
  }
}

module.exports = verifyFirebaseToken;
