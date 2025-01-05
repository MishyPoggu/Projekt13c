const connections = require('../Connections/connections');

// Felhasználók 
const Users = require('./users');
const Token = require('./token');

// Ezeknek az értéke nem fog változni, csak a szerveren tárolni kell őket
const ArcadeMachines = require('./arcademachines');
const Consoles = require('./consoles');
const PinballMachines = require('./pinballmachines');

Users.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(Users, { foreignKey: 'userId' });


module.exports = {
    connections,
    ArcadeMachines,
    Consoles,
    PinballMachines,
    Users,
    Token
};