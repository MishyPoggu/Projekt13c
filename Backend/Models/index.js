const connections = require('../Connections/connections');

const Users = require('./users');
const Token = require('./token');

Users.hasMany(Token, { foreignKey: 'userId' });
Token.belongsTo(Users, { foreignKey: 'userId' });

module.exports = {
  connections,
  Users,
  Token
};