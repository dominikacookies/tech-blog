const { Router } = require("express");

const publicRoutes = require("./public")
const privateRoutes = require("./private");
const authenticator = require("../../middleware/authenticator");

const router = Router();

router.use(publicRoutes)
router.use(authenticator, privateRoutes)

module.exports = router