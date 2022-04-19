const Sequelize = require('sequelize');

const setupItems = {
  name: 'setupItems',
  columns: {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    setupId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    productTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    productQty: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }
}

module.exports = setupItems;