const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");
const Users = require("./users");

const Posts = connections.define(
  "Post",
  {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "userId",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Posts",
  }
);

Posts.belongsTo(Users, { foreignKey: "userId" });
module.exports = Posts;