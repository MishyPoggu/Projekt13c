const { DataTypes } = require('sequelize');
const connections = require('../Connections/connections');

const Consoles = connections.define('Console', {
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
        tableName: 'Consoles',
    }
); 

module.exports = Consoles;
