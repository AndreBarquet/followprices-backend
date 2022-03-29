const Sequelize = require('sequelize');

const prices = {
  name: 'prices',
  columns: {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    inCashValue: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    inTermValue: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }
}

module.exports = prices;