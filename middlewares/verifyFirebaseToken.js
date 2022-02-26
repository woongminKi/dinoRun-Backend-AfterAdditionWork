const createError = require("http-errors");
const admin = require("../config/firebase");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decode = await admin.auth().verifyIdToken(token);

    if (decode) {
      req.user = decode;

      next();
      return;
    } else {
      next(createError(500, "유효하지 않은 토큰입니다."));
    }
  } catch (err) {
    next(createError(403, 'Forbidden'));
  }
}

module.exports = verifyToken;
