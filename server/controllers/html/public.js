const {Post, User} = require("../../models")

const renderHomePage = async (req,res) => {
  const loggedIn = req.session.loggedIn

  const postsData = await Post.findAll({
    order: [ [ 'createdAt', 'DESC' ]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }) 

  const posts = postsData.map((post)=> post.get({ plain:true }));

  res.render("home", {posts, loggedIn})
}

const renderSignupPage = async (req,res) => {
  res.render("signup")
  console.log("signup")
}

const renderLoginPage = async (req,res) => {
  res.render("login")
}

module.exports = {
  renderHomePage,
  renderSignupPage,
  renderLoginPage
}