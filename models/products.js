const Sequelize = require('sequelize');

const products = {
  name: 'products',
  columns: {
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
      allowNull: true
    },
    store: {
      type: Sequelize.STRING,
      allowNull: false
    },
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }
}

module.exports = products;