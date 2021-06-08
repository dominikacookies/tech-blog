const {Post} = require("../../models")

const renderHomePage = async (req,res) => {
  console.log("homepage")
}

const renderSignupPage = async (req,res) => {
  console.log("signup")
}

const renderLoginPage = async (req,res) => {
  console.log("login")
}

module.exports = {
  renderHomePage,
  renderSignupPage,
  renderLoginPage
}