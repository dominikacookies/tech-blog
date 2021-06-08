const bcrypt = require("bcrypt");

const beforeCreate = async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
}

module.exports = { beforeCreate }