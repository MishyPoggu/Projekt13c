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
    machineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    machineType: {
      type: DataTypes.ENUM("ArcadeMachine", "Console", "PinballMachine"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "UserMachines",
    indexes: [
      {
        unique: true,
        fields: ["userId", "machineId", "machineType"],
      },
    ],
  }
);

module.exports = UserMachines;
