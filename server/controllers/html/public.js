const {Post} = require("../../models")

const renderHomePage = async (req,res) => {
  const posts = await Post.findAll({
    order: [ [ 'createdAt', 'DESC' ]],
    limit: 2,
    raw: true,
    nested: true}) 
  console.log("homepage")
}

const renderSignupPage = async (req,res) => {
  res.render("signup")
  console.log("signup")
}

const renderLoginPage = async (req,res) => {
  res.render("login")
  console.log("login")
}

module.exports = {
  renderHomePage,
  renderSignupPage,
  renderLoginPage
}