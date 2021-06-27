const { Router } = require("express")

const { updatePost, deletePost, createPost, updateComment, deleteComment, createComment} = require("../../controllers/api");

const router = Router();

router.post('/post', createPost)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

router.post('/comment', createComment)
router.put('/comment/:id', updateComment)
router.delete('/comment/:id', deleteComment)

module.exports = router