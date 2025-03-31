const Sequelize = require('sequelize');
const connections = require("../Connections/connections");

// A connections egy inicializált Sequelize példány
const sequelize = connections;

const Users = require("./users");
const Token = require("./token");
const UserMachines = require("./usermachines");

const ArcadeMachines = require("./arcademachines");
const Consoles = require("./consoles");
const PinballMachines = require("./pinballmachines");

const Addresses = require("./addresses");
const Advertisements = require("./advertisements");
const Companies = require("./companies");

// Posztok és kommentek 
const Posts = require("./posts");
const Comments = require("./comments");

// Gépek hozzákötése a felhasználókhoz
Users.belongsToMany(ArcadeMachines, {
  through: UserMachines,
  foreignKey: "userId",
  otherKey: "name",
});
ArcadeMachines.belongsToMany(Users, {
  through: UserMachines,
  foreignKey: "name",
  otherKey: "userId",
});

Users.belongsToMany(Consoles, {
  through: UserMachines,
  foreignKey: "userId",
  otherKey: "name",
});
Consoles.belongsToMany(Users, {
  through: UserMachines,
  foreignKey: "name",
  otherKey: "userId",
});

Users.belongsToMany(PinballMachines, {
  through: UserMachines,
  foreignKey: "userId",
  otherKey: "name",
});
PinballMachines.belongsToMany(Users, {
  through: UserMachines,
  foreignKey: "name",
  otherKey: "userId",
});

Users.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(Users, { foreignKey: "userId" });

Users.hasMany(ArcadeMachines, { foreignKey: "userId" });
Users.hasMany(Consoles, { foreignKey: "userId" });
Users.hasMany(PinballMachines, { foreignKey: "userId" });

Advertisements.belongsTo(Addresses, {
  foreignKey: "addressId",
  targetKey: "addressId",
  onDelete: "CASCADE",
});
Addresses.hasMany(Advertisements, {
  foreignKey: "addressId",
  sourceKey: "addressId",
  onDelete: "CASCADE",
});
Advertisements.belongsTo(Companies, {
  foreignKey: "companyName",
  targetKey: "companyName",
  onDelete: "CASCADE",
});

Posts.belongsTo(Users, { foreignKey: "userId" });
Posts.belongsTo(Companies, { foreignKey: "companyId" });
Comments.belongsTo(Users, { foreignKey: "userId" });
Comments.belongsTo(Companies, { foreignKey: "companyId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });

sequelize.sync({ force: false }).then(() => {
  console.log('Adatbázis szinkronizálva');
}).catch(err => {
  console.error('Szinkronizálási hiba:', err);
});

module.exports = {
  sequelize, 
  ArcadeMachines,
  Consoles,
  PinballMachines,
  Users,
  Token,
  Companies,
  Advertisements,
  Addresses,
  Posts,
  Comments,
  UserMachines,
};