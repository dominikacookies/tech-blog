const sequelize = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const users = require("./user");
const posts = require("./post");
const comments = require("./comment");

const seed = async () => {
  await sequelize.sync({force:true});
  console.info("all models were synced successfully")

  await User.bulkCreate(users);
  console.info("seeded users");

  await Post.bulkCreate(posts);
  console.info("seeded posts");

  await Comment.bulkCreate(comments);
  console.info("seeded comments");

  process.exit(0);
};

seed()