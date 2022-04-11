const database = require('../config/database');
const users = require('../models/users');
const products = require('./products');
const types = require('./types');
const prices = require('./prices');

const usersTable = database.define(users.name, users.columns)
const productsTable = database.define(products.name, products.columns)
const typesTable = database.define(types.name, types.columns)
const pricesTable = database.define(prices.name, prices.columns)
productsTable.belongsTo(typesTable, { onDelete: 'cascade', foreignKey: 'typeId', targetKey: 'id' })
pricesTable.belongsTo(productsTable, { onDelete: 'cascade', foreignKey: 'productId', targetKey: 'id' })

// productsTable.hasMany(typesTable, { onDelete: "cascade" })
// pricesTable.hasMany(productsTable, { onDelete: "cascade" })

module.exports = { productsTable, typesTable, pricesTable, usersTable };