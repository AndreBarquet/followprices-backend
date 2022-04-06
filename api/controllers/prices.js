const { getOrder } = require('../../utils/queryUtils');
const { Op } = require('@sequelize/core');
const { exists, notExists } = require('../../utils/utils');


module.exports = app => {
  const { pricesTable } = require('../../models/dbTables');
  const controller = {};

  // Get all prices list
  controller.getAll = (req, res) => {
    const where = { [Op.and]: [{ productId: req.query.productId }] };

    if (exists(req.query.date)) where[Op.and].push({ date: new Date((req.query.date)).getTime() });
    if (exists(req.query.initialDate) && exists(req.query.finalDate)) {
      const initialDate = new Date((req.query.initialDate)).getTime();
      const finalDate = new Date((req.query.finalDate)).getTime()
      where.date = { [Op.between]: [initialDate, finalDate] };
    }

    // Oder field must be ASC or DESC
    const order = getOrder(req.query.field ?? 'date', req.query.order ?? 'DESC');

    pricesTable.findAndCountAll({ where }).then((response) => {
      res.status(200).json({ totalItems: response.count, content: response.rows });
    }).catch(err => {
      console.log("ERROR...:", err);
      let errorMessage = 'Ocorreu um erro ao buscar a lista de preços';
      if (notExists(req.query.productId)) errorMessage = 'Ocorreu um erro. Filtro por productId é obrigatório'
      res.status(500).json({ error: errorMessage })
    })
  };

  // Insert new price
  controller.insert = (req, res) => {
    let date = null;
    if (exists(req.body.date)) date = new Date((req.body.date)).getTime();

    const body = { ...req.body, date };

    pricesTable.create(body).then((response) => {
      res.status(200).json({ date: response.date });
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao inserir o preço' })
    })
  };

  // Update price
  controller.update = (req, res) => {
    let date = null;
    if (exists(req.body.date)) date = new Date((req.body.date)).getTime();

    const body = { ...req.body };
    const seqQuery = { where: { id: req.params.id } }

    pricesTable.update(body, seqQuery).then(() => {
      res.status(200).json(true);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o preço' })
    })
  };

  // Delete price
  controller.delete = (req, res) => {
    const seqQuery = { where: { id: req.params.id } }
    pricesTable.destroy(seqQuery).then(() => {
      res.status(200).json(true);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o preço' })
    })
  };

  return controller;
}