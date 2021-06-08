const {Post} = require("../../models")

const renderHomePage = async (req,res) => {
  res.render("home")
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