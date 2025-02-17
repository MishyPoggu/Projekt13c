const { DataTypes } = require('sequelize');
const connections = require('../Connections/connections');
const Companies = require('./companies');
const Addresses = require('./addresses');

const Advertisements = connections.define('Advertisement', {
    advertisementId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    companyName: {
        type: DataTypes.STRING,
        references: {
            model: Companies,
            key: 'companyName',
        },
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressId: {
        type: DataTypes.INTEGER,
        references: {
            model: Addresses,
            key: 'addressId',
        },
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'Advertisements',
});

module.exports = Advertisements;
