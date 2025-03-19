const connections = require("../Connections/connections");

const Users = require("./users");
const Token = require("./token");

const UserMachines = require("./usermachines");

// Ezeknek az értéke nem fog változni, csak a szerveren tárolni kell őket
const ArcadeMachines = require("./arcademachines");
const Consoles = require("./consoles");
const PinballMachines = require("./pinballmachines");

// Céges dolgok
const Addresses = require("./addresses");
const Advertisements = require("./advertisements");
const Companies = require("./companies");

// Posztok és kommentek (új)
const Posts = require("./posts");
const Comments = require("./comments");

// Gépek hozzákötése a felhasználókhoz
Users.belongsToMany(ArcadeMachines, { through: UserMachines, foreignKey: "userId", otherKey: "machineId" });
ArcadeMachines.belongsToMany(Users, { through: UserMachines, foreignKey: "machineId", otherKey: "userId" });

Users.belongsToMany(Consoles, { through: UserMachines, foreignKey: "userId", otherKey: "machineId" });
Consoles.belongsToMany(Users, { through: UserMachines, foreignKey: "machineId", otherKey: "userId" });

Users.belongsToMany(PinballMachines, { through: UserMachines, foreignKey: "userId", otherKey: "machineId" });
PinballMachines.belongsToMany(Users, { through: UserMachines, foreignKey: "machineId", otherKey: "userId" });

Users.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(Users, { foreignKey: "userId" });

// Gépek hozzáfűzése
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

// Új összekötések posztokhoz és kommentekhez
Posts.belongsTo(Users, { foreignKey: "userId" });
Comments.belongsTo(Users, { foreignKey: "userId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });

module.exports = {
  connections,
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
