const database = require('../config/database');
const products = require('./products');
const types = require('./types');
const prices = require('./prices');

const productsTable = database.define(products.name, products.columns)
const typesTable = database.define(types.name, types.columns)
const pricesTable = database.define(prices.name, prices.columns)
productsTable.belongsTo(typesTable, { foreignKey: 'typeId', targetKey: 'id' })
pricesTable.belongsTo(productsTable, { foreignKey: 'productId', targetKey: 'id' })

// productsTable.hasMany(typesTable, { onDelete: "cascade" })
// pricesTable.hasMany(productsTable, { onDelete: "cascade" })

module.exports = { productsTable, typesTable, pricesTable };