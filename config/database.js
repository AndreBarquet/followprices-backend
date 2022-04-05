const Sequelize = require('sequelize');
const sequelize = new Sequelize('followpricesdb', 'root', 'asdf1234',
  // const sequelize = new Sequelize('followpricesdb', 'andrebarquet', 'albm170928',
  {
    dialect: 'mysql', host: 'localhost', port: 3306
  });

module.exports = sequelize;