const {Router} = require("express");

const authRoutes = require("./auth");
const apiRoutes = require("./api")
const htmlRoutes = require("./html")
const authenticator = require("../middleware/authenticator");

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", authenticator, apiRoutes);
router.use("/", htmlRoutes);

module.exports = router