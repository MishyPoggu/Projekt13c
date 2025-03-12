const { Sequelize } = require("sequelize");
const config = require("./config");

const connections = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: console.log,
  }
);

// Néha kell, amikor új táblát hozunk létre
// connections.sync({ force: true });

connections
  .authenticate()
  .then(() => {
    console.log("Successfully connected to the database:", config.db.name);
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
  });

module.exports = connections;