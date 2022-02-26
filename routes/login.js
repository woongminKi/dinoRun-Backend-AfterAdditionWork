const express = require("express");
const router = express.Router();
const { getUser, signIn } = require("./controllers/login.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getUser);
router.post("/", signIn);

module.exports = router;
