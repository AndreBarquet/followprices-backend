const database = require('../config/database');
const products = require('./products');
const types = require('./types');

const productsTable = database.define(products.name, products.columns)
const typesTable = database.define(types.name, types.columns)
productsTable.belongsTo(typesTable, { foreignKey: 'typeId', targetKey: 'id' })

module.exports = { productsTable };