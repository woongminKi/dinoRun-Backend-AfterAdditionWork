const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getRoomInfo,
  registerRoom,
  deleteRoom,
} = require("./controllers/rooms.controller");

router.get("/:roomid", verifyToken, getRoomInfo);
router.post("/:roomid", verifyToken, registerRoom);
router.delete("/:roomid", deleteRoom);

module.exports = router;
