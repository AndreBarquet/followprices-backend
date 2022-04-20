const { getOrder, getPagination, getPagingData } = require('../../utils/queryUtils');
const { Op } = require('@sequelize/core');
const { exists, notExists } = require('../../utils/utils');


module.exports = app => {
  const { setupsTable, setupItemsTable } = require('../../models/dbTables');
  const controller = {};

  // Get all setups list
  controller.getAll = (req, res) => {
    const where = { [Op.and]: [] };

    if (exists(req.query.name)) where.name = { [Op.like]: `%${req.query.name}%` };
    if (exists(req.query.description)) where.description = { [Op.like]: `%${req.query.description}%` };

    // const typeFieldsToSelect = [{ model: typesTable, required: true, attributes: ["id", "description"] }]

    // Oder field must be ASC or DESC
    const order = getOrder(req.query.field, req.query.order);
    const filters = { where, /* include: typeFieldsToSelect, */ order, ...getPagination(req.query.page, req.query.size) }

    setupsTable.findAndCountAll(filters).then((response) => {
      res.status(200).json(getPagingData(response, req.query.page, req.query.size));
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os setups salvos' })
    })
  };

  // Insert new setup
  controller.insert = (req, res) => {
    if (notExists(req.body.products)) return;

    const newSetupBody = {
      name: req.body.name,
      description: req.body.description,
    };

    function saveSetupItems(setupData) {
      const setupItemsList = [];
      req.body.products.forEach(currentItem => {
        setupItemsList.push({ setupId: setupData.id, productId: currentItem.id, productTypeId: currentItem.typeId, productQty: currentItem.quantity })
      });

      setupItemsTable.bulkCreate(setupItemsList).then(() => {
        res.status(200).json(setupData?.dataValues);
      }).catch(err => {
        console.log("ERROR...:", err);
        res.status(500).json({ error: `Ocorreu um erro ao salvar os items do setup ${setupData.name}` })
      })
    }

    setupsTable.create(newSetupBody).then((response) => {
      saveSetupItems(response)
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao salvar o setup' })
    })
  };


  return controller;
}