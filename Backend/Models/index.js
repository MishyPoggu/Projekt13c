const connections = require('../Connections/connections');

// Felhasználók 
const Users = require('./users');
const Token = require('./token');

// Cégek bejelentkezéséhez
const Companies = require('./companies');
const Addresses = require('./addresses');

// Ezeknek az értéke nem fog változni, csak a szerveren tárolni kell őket
const ArcadeMachines = require('./arcademachines');
const Consoles = require('./consoles');
const PinballMachines = require('./pinballmachines');

Users.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(Users, { foreignKey: 'userId' });

Companies.hasMany(Addresses, { foreignKey: 'companyId' });
Addresses.belongsTo(Companies, { foreignKey: 'companyId' });


module.exports = {
    connections,
    ArcadeMachines,
    Consoles,
    PinballMachines,
    Users,
    Token
};