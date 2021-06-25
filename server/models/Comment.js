const {Model, DataTypes} = require("sequelize");

const sequelize = require("../config/connection");

const options = {
  sequelize,
  modelName: "comment",
  timestamps: true,
  underscored: true,
  freezeTableName: true,
};

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id"
    },
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "post",
      key: "id"
    },
  }
};

class Comment extends Model {}

Comment.init(schema, options)

module.exports = Comment;