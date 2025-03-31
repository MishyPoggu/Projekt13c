const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");
const Users = require("./users");
const Posts = require("./posts");
const Companies = require("./companies");

const Comments = connections.define(
  "Comment",
  {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Users,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Companies,
        key: "companyId",
      },
      onDelete: "CASCADE",
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Posts,
        key: "postId",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Comments",
  }
);

Comments.belongsTo(Users, { foreignKey: "userId" });
Comments.belongsTo(Companies, { foreignKey: "companyId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });

module.exports = Comments;