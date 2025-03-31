const { DataTypes } = require("sequelize");
const connections = require("../Connections/connections");

const CompanyMachines = connections.define(
  "CompanyMachines",
  {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Companies",
        key: "companyId",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    machineType: {
      type: DataTypes.ENUM("ArcadeMachine", "Console", "PinballMachine"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "CompanyMachines",
  }
);

module.exports = CompanyMachines;