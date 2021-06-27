const {Model, DataTypes} = require("sequelize");

const sequelize = require("../config/connection");

const options = {
  sequelize,
  modelName: "post",
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id"
    },
    onDelete: "cascade",
    onUpdate: "cascade"
  }
};

class Post extends Model {}

Post.init(schema, options)

module.exports = Post;