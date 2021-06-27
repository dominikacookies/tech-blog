const bcrypt = require("bcrypt");

const beforeBulkCreate = async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
}

const beforeCreate = async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
}

module.exports = { beforeCreate, beforeBulkCreate }