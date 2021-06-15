const { Post } = require("../../models")

const renderDashboard = async (req, res) => {
  const {firstName, id} = req.session.user

  const userPosts = await Post.findAll({
    where: {
      user_id: id
    },
    raw: true,
    nested: true
  })

  res.render("dashboard", {firstName, userPosts})
}

const renderEditPostPage = (req, res) => {
  console.log("Edit post")
}

const renderPostPage = (req, res) => {
  console.log("Post")
}

const updatePost = async (req, res) => {
  console.log("update")
}

const deletePost = async (req, res) => {
  console.log("delete")
}

module.exports = {
  renderDashboard,
  renderEditPostPage,
  renderPostPage,
  updatePost,
  deletePost
}