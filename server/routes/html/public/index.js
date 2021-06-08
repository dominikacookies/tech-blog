const { Router } = require("express");

const {  renderHomePage, renderSignupPage, renderLoginPage } = require("../../../controllers/html/public")

const router = Router();

router.get("/signup", renderSignupPage)
router.get("/login", renderLoginPage)
router.get("/", renderHomePage)

module.exports = router