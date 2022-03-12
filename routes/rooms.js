const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getRoomInfo,
  registerRoom,
  getRoomPeople,
} = require("./controllers/rooms.controller");

// 깃 커밋 적용 안 되서 확인차 남기는 주석. 지울 것임.
router.get("/:id", verifyToken, getRoomInfo);
router.get("/:id/game", verifyToken, getRoomPeople);
router.post("/:id", verifyToken, registerRoom);

module.exports = router;
