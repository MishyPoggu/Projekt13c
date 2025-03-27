const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");

const ArcadeMachines = connections.define(
  "ArcadeMachine",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    release: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "ArcadeMachines",
  }
);

module.exports = ArcadeMachines;
