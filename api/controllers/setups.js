const { getOrder } = require('../../utils/queryUtils');
const { Op } = require('@sequelize/core');
const { exists, notExists } = require('../../utils/utils');


module.exports = app => {
  const { setupsTable, setupItemsTable } = require('../../models/dbTables');
  const controller = {};

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