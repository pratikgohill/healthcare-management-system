const express = require("express");
const { register, login, getProfile } = require("../controller/auth");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", [authorization], getProfile);

module.exports = router;
