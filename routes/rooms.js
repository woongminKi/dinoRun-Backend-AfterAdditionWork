const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getRoomInfo,
  registerRoom,
  getRoomPeople,
} = require("./controllers/rooms.controller");

router.get("/:id", verifyToken, getRoomInfo);
router.get("/:id/game", verifyToken, getRoomPeople);
router.post("/:id", verifyToken, registerRoom);

module.exports = router;
