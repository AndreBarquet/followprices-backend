const { getOrder, getPagination, getPagingData } = require('../../utils/queryUtils');
const { Op, QueryTypes } = require('@sequelize/core');
const { exists, notExists } = require('../../utils/utils');
const sequelize = require('../../config/database');


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

  controller.getAvailableDates = (req, res) => {
    if (notExists(req.params.id)) {
      res.status(500).json({ error: 'Id do setup não informado' })
      return;
    }

    const query = 'select date from prices pri ' +
      'inner join products prd on prd.id = pri.productId ' +
      `inner join setupitems sti on prd.id = sti.productId and sti.setupId = ${req.params.id} ` +
      'group by date;';

    sequelize.query(query, { type: QueryTypes.SELECT }, { raw: true }).then((response) => {
      res.status(200).json(response.map(currentResult => currentResult?.date));
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu ao buscar as datas disponiveis deste setup' })
    })
  };

  controller.getSetupDetailsByDate = (req, res) => {
    if (notExists(req.params.id)) {
      res.status(500).json({ error: 'Id do setup não informado' });
      return;
    }

    if (notExists(req.query.date)) {
      res.status(500).json({ error: 'Data não informada' });
      return;
    }

    const query = 'select name, prd.description as description, tp.description as type, tp.type as typeEnum, productQty, date, store, inCashValue*productQty as inCashValue, inTermValue*productQty as inTermValue from products prd ' +
      `inner join prices pri on prd.id = pri.productId and pri.date = ${req.query.date}` +
      'inner join types tp on prd.typeId = tp.id ' +
      `inner join setupitems sti on prd.id = sti.productId and sti.setupId = ${req.params.id};`;

    sequelize.query(query, { type: QueryTypes.SELECT }, { raw: true }).then((response) => {
      if (notExists(response) || response.length <= 0) {
        res.status(500).json({ error: 'Não há detalhes do setup para esta data' })
        return;
      }

      res.status(200).json(response);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os detalhes deste setup' })
    })
  };

  controller.getLatestDetails = (req, res) => {
    if (notExists(req.params.id)) {
      res.status(500).json({ error: 'Id do setup não informado' });
      return;
    }

    const query = 'select name, prd.description as description, tp.description as type, tp.type as typeEnum, productQty, date, store, inCashValue*productQty as inCashValue, inTermValue*productQty as inTermValue from products prd ' +
      'inner join ( ' +
      '   select id, max(date) as date, store, inCashValue, inTermValue, productId ' +
      '   from prices ' +
      '   group by productId ' +
      ') pri on prd.id = pri.productId ' +
      'inner join types tp on prd.typeId = tp.id ' +
      `inner join setupitems sti on prd.id = sti.productId and sti.setupId = ${req.params.id};`;

    sequelize.query(query, { type: QueryTypes.SELECT }, { raw: true }).then((response) => {
      if (notExists(response) || response.length <= 0) {
        res.status(500).json({ error: 'Não há detalhes para este setup' })
        return;
      }

      res.status(200).json(response);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os detalhes deste setup' })
    })
  };

  controller.getDetailsEvolution = (req, res) => {
    if (notExists(req.params.id)) {
      res.status(500).json({ error: 'Id do setup não informado' });
      return;
    }

    const query = 'select prd.id as productId, name, prd.description as description, tp.description as type, tp.type as typeEnum, productQty, date, store, inCashValue*productQty as inCashValue, inTermValue*productQty as inTermValue from products prd ' +
      'inner join prices pri on prd.id = pri.productId ' +
      'inner join types tp on prd.typeId = tp.id ' +
      `inner join setupitems sti on prd.id = sti.productId and sti.setupId = ${req.params.id} ` +
      'group by date, name ' +
      'order by type;';

    sequelize.query(query, { type: QueryTypes.SELECT }, { raw: true }).then((response) => {
      if (notExists(response) || response.length <= 0) {
        res.status(500).json({ error: 'Não há detalhes para este setup' })
        return;
      }

      const responseMapped = {};
      response.forEach(currentProduct => {
        if (notExists(responseMapped[currentProduct?.typeEnum])) responseMapped[currentProduct?.typeEnum] = [currentProduct];
        else responseMapped[currentProduct?.typeEnum].push(currentProduct)
      });
      res.status(200).json(responseMapped);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os detalhes deste setup' })
    })
  };


  return controller;
}