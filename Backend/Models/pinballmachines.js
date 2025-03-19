const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");

const PinballMachines = connections.define("PinballMachine", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  release: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: "PinballMachines",
});

module.exports = PinballMachines;
