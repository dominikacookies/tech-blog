const { Router } = require("express")

const { renderDashboard, renderEditPostPage, renderPostPage, renderNewPostPage} = require("../../../controllers/html/private");

const router = Router();

router.get("/dashboard", renderDashboard);
router.get('/dashboard/post/:id', renderEditPostPage);
router.get('/post/:id', renderPostPage);
router.get('/newpost', renderNewPostPage);

module.exports = router