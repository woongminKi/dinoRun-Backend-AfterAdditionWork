const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { getRoomInfo, registerRoom } = require("./controllers/rooms.controller");

router.get("/:id", verifyToken, getRoomInfo);
router.post("/:id", verifyToken, registerRoom);

module.exports = router;
