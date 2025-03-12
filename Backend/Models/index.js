const connections = require("../Connections/connections");

const Users = require("./users");
const Administrators = require("./admin");
const Token = require("./token");

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

// Összekötések (meglévő)
Users.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(Users, { foreignKey: "userId" });

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
  Administrators,
  Posts,       // Új
  Comments,    // Új
};