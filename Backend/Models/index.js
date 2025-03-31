const Sequelize = require('sequelize');
const connections = require("../Connections/connections");

// A connections egy inicializált Sequelize példány
const sequelize = connections;

// Modellek importálása
const Users = require("./users");
const Token = require("./token");
const UserMachines = require("./usermachines");
const ArcadeMachines = require("./arcademachines");
const Consoles = require("./consoles");
const PinballMachines = require("./pinballmachines");
const Addresses = require("./addresses");
const Advertisements = require("./advertisements");
const Companies = require("./companies");
const CompanyMachines = require("./companyMachines"); 

// Posztok és kommentek (új)
const Posts = sequelize.define('Posts', {
  postId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { 
    type: Sequelize.INTEGER, 
    allowNull: false,
    references: { model: 'Users', key: 'userId' } // Idegenkulcs
  },
  title: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
  companyName: { type: Sequelize.STRING },
  streetAddress: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  postalCode: { type: Sequelize.STRING },
  stateOrRegion: { type: Sequelize.STRING },
  country: { type: Sequelize.STRING },
  imageUrl: { type: Sequelize.STRING },
  type: { type: Sequelize.ENUM('forum', 'location'), defaultValue: 'forum' }
});
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

Companies.hasMany(Addresses, { foreignKey: "companyId" });
Addresses.belongsTo(Companies, { foreignKey: "companyId" });

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

// CompanyMachines kapcsolatok
Companies.hasMany(CompanyMachines, { foreignKey: "companyId" });
CompanyMachines.belongsTo(Companies, { foreignKey: "companyId" });

// Posztok és kommentek kapcsolatok
Posts.belongsTo(Users, { foreignKey: "userId" });
Comments.belongsTo(Users, { foreignKey: "userId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });

// Szinkronizálás
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
  CompanyMachines,
};