const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");

const UserMachines = connections.define("UserMachines", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
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
}, {
  timestamps: true,
  tableName: "UserMachines",
});

module.exports = UserMachines;
