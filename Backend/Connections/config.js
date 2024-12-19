const dotenv = require("dotenv");
dotenv.config();

const config = {
  devMode: process.env.ENVIRONMENT ? Boolean(process.env.ENVIRONMENT) : false,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    dialect: process.env.DB_DIALECT || "mariadb",
    name: process.env.DB_NAME || "project",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || ""
  }
};

module.exports = config;