const database = require('../config/database');
const users = require('../models/users');
const products = require('./products');
const types = require('./types');
const prices = require('./prices');
const setups = require('./setups');
const setupItems = require('./setupItems');

const usersTable = database.define(users.name, users.columns);

const productsTable = database.define(products.name, products.columns);
const typesTable = database.define(types.name, types.columns);
productsTable.belongsTo(typesTable, { onDelete: 'cascade', foreignKey: 'typeId', targetKey: 'id' });

const pricesTable = database.define(prices.name, prices.columns);
pricesTable.belongsTo(productsTable, { onDelete: 'cascade', foreignKey: 'productId', targetKey: 'id' });

const setupsTable = database.define(setups.name, setups.columns);
const setupItemsTable = database.define(setupItems.name, setupItems.columns);
setupItemsTable.belongsTo(setupsTable, { onDelete: 'cascade', foreignKey: 'setupId', targetKey: 'id' });

module.exports = { productsTable, typesTable, pricesTable, usersTable, setupsTable, setupItemsTable };