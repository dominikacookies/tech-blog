//remove later
const bcrypt = require("bcrypt");

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
  try {
    const { username , password } = req.body

    if (!username || !password) {
      return res.status(404).json({
        error: "Required values missing."
      })
    }
    
    const userData = await User.findOne({where : { username }})
    // why does this not work?
    // user.get({ plain: true })

    if (!userData) {
      return res.status(404).json({
        error: "User does not exist"
      })
    }

    const {dataValues : user} = data
  
    // when trying to do this via model method it says that it doesn't exist
    const matchResult = await bcrypt.compare(password, user.password);

    if (!matchResult) {
      return res.status(404).json({
        error: "Password invalid."
      })
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
    }
  
    req.session.loggedIn = true
  
    return res.status(200).json({
      message: "Log in successful."
    })
  
  } catch (error) {
    return res.status(500).json({
      error: "Unable to login. Please try again later."
    })
  }
}


const logout = async (req, res) => {
  console.log(req.session)

  delete req.session.loggedIn
  delete req.session.user
  console.log(req.session)
}

module.exports = {
  signup,
  login,
  logout
}