const { Router } = require("express")

const {  renderDashboard, renderEditPostPage, renderPostPage, updatePost, deletePost} = require("../../../controllers/html/private");

const router = Router();

router.get("/dashboard", renderDashboard);
router.get('/dashboard/post/:id', renderEditPostPage);
router.get('/post/:id', renderPostPage);

router.post('/dashboard/post/:id', updatePost)
router.delete('/dashboard/post/:id', deletePost)

module.exports = router