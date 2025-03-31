const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");
const Users = require("./users");
const Companies = require("./companies");

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
      allowNull: true,
      references: {
        model: Users,
        key: "userId",
      },
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Companies,
        key: "companyId",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stateOrRegion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "Posts",
  }
);

Posts.belongsTo(Users, { foreignKey: "userId" });
Posts.belongsTo(Companies, { foreignKey: "companyId" });

module.exports = Posts;