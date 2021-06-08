const signup = async (req, res) => {
  const {username, password, firstName : first_name, lastName : last_name} = req.body
  console.log(username, password, first_name, last_name)
  // req.session.isLoggedIn = true
  // console.log(req.session.isLoggedIn)
  // req.session.save(() => {
  //   req.session.isLoggedIn = true
  // })
  res.json({})
}

const login = async (req, res) => {
  console.log("login")
}

const logout = async (req, res) => {
  console.log("logout")
}

module.exports = {
  signup,
  login,
  logout
}