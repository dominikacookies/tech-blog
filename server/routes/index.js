const {Router} = require("express");

const authRoutes = require("./auth");
const apiRoutes = require("./api")
const htmlRoutes = require("./html")

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router