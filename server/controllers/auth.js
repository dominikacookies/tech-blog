const { User } = require("../models")

const signup = async (req, res) => {
  try {
    const {username, password, firstName : first_name, lastName : last_name} = req.body

    if (username && password && first_name && last_name) {

      await User.create({
        username,
        password,
        first_name,
        last_name
      })

      return res.status(200).json({
        message: "User created successfully."
      })
    }

    return res.status(400).json({
      error: "Required values missing."
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Failed to create user"
    })
    
  }
}

const login = async (req, res) => {
  console.log("login")
}

const logout = async (req, res) => {
    // req.session.isLoggedIn = true
  // console.log(req.session.isLoggedIn)
  // req.session.save(() => {
  //   req.session.isLoggedIn = true
  // })
  console.log("logout")
}

module.exports = {
  signup,
  login,
  logout
}