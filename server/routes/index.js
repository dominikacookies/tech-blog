const {Router} = require("express");

const authRoutes = require("./auth");
const htmlRoutes = require("./html")

const router = Router();

router.use("/auth", authRoutes);
router.use("/", htmlRoutes);

module.exports = router