const { Router } = require("express")

const { renderDashboard, renderEditPostPage, renderPostPage} = require("../../../controllers/html/private");

const router = Router();

router.get("/dashboard", renderDashboard);
router.get('/dashboard/post/:id', renderEditPostPage);
router.get('/post/:id', renderPostPage);

module.exports = router