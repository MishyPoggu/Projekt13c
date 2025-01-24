const { DataTypes } = require('sequelize');
const connections = require('../Connections/connections');

const Companies = connections.define('Company', {
    companyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    taxNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contactPerson: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    websiteUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    tableName: 'Companies', 
});

module.exports = Companies;
