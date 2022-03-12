const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getRoomInfo,
  registerRoom,
  getRoomPeople,
} = require("./controllers/rooms.controller");

router.get("/", verifyToken, getRoomInfo);
router.get("/:id/game", verifyToken, getRoomPeople);
router.post("/", verifyToken, registerRoom);

module.exports = router;
