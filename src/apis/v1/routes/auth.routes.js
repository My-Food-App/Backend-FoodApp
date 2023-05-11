const express = require("express");
const router = express.Router();
const { login, register, verify, logout } = require("../controllers/auth.controller");
const { isEmail } = require("../validations/validations");

router.post("/login", isEmail, login);
router.post("/register", isEmail, register);
router.post("/verify", isEmail, verify);
router.post("/logout", isEmail, logout);

module.exports = router;
