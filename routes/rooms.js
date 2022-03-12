const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { getRoomInfo, registerRoom } = require("./controllers/rooms.controller");

router.get("/", verifyToken, getRoomInfo);
router.post("/", verifyToken, registerRoom);

module.exports = router;
