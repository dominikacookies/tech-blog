const { Router } = require("express");

const {login, logout, signup} = require("../../controllers/auth")

router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router