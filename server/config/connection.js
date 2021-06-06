const sequelize = require("sequelize")

const dbOptions = {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false,
}

const dbName = "tech_blog_db";
const dbUser = "root";
const dbPassword = "password";
// const dbName = process.env.DB_NAME;
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;

const connection = new sequelize(dbName, dbUser, dbPassword, dbOptions);

module.exports = connection;