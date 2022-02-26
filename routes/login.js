const express = require("express");
const router = express.Router();
const { getUser, signIn } = require("./controllers/login.controller");
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.get("/", verifyFirebaseToken, getUser);
router.post("/", signIn);

module.exports = router;
