const { DataTypes } = require('sequelize');
const connections = require('../Connections/connections');

const Token = connections.define('Token', {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userId',
        },
        onDelete: 'CASCADE',
        },
        token: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        loginAt: {
        type: DataTypes.DATE,
        allowNull: false,
        },
        expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        },
    }, {
        timestamps: true,
        tableName: 'Tokens',
    }
);

module.exports = Token;