const { Router } = require("express");

const {  renderHomePage, renderSignupPage, renderLoginPage } = require("../../../controllers/html/public")

const router = Router();

router.get("/", renderHomePage)
router.get("/signup", renderSignupPage)
router.get("/login", renderLoginPage)

module.exports = router