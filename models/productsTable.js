const Sequelize = require('sequelize');
const database = require('../config/database');

const productsTable = database.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  typeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  }
})

module.exports = productsTable;