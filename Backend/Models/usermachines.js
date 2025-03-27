const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");

const UserMachines = connections.define(
  "UserMachines",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userId",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    machineType: {
      type: DataTypes.ENUM("ArcadeMachine", "Console", "PinballMachine"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "UserMachines",
  }
);

module.exports = UserMachines;
