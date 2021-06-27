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

const renderEditPostPage = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id
    },
    raw: true,
    nested: true
  })

  res.render("edit-post", {post})
  console.log("Edit post")
}

const renderPostPage = async (req, res) => {
  const postData = await Post.findOne({
    where: {
      id: req.params.id
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

  const post = postData.get({ plain: true })
  
  const promises = post.comments.map(
    async (comment) => {
      if (comment.user_id === req.session.user.id ) {
        comment.belongsToUser = true
      }
      return comment
    }
  )

  const postComments = await Promise.all(promises)

  post.comments = postComments 

  console.log(post)
  res.render("post", {post})
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