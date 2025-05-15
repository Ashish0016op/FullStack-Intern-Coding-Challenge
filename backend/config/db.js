const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store_finder', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
module.exports = sequelize;