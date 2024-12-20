const { Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: console.log,
  }
);

sequelize.authenticate()
.then(() => {
  console.log('Successfully connected to the database:', config.db.name);
})
.catch(err => {
  console.error('Failed to connect to the database:', err.message);
});


module.exports = sequelize;