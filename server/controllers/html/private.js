const { Post, User, Comment } = require("../../models")

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

const renderPostPage = async (req, res) => {
  const postData = await Post.findOne({
    where: {
      id: req.params
    },
    include: [
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ["username"]
          }
        ]
      },
      {
        model: User,
        attributes: ["username"]
      }
    ],
  })

  const post = postData.get({plain:true})
  console.log(post)
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