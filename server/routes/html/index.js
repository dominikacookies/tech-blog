const { Router } = require("express");

const publicRoutes = require("./public")
const privateRoutes = require("./private")

const router = Router();

router.use(publicRoutes)
router.use(privateRoutes)

module.exports = router