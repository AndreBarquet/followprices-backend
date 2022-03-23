// const { getOffsetByPageNumber, exists } = require('../../utils/utils');

module.exports = app => {
  const { productsTable } = require('../../models/dbTables');
  const controller = {};

  // Get all products list
  controller.getAll = (req, res) => {
    // const limit = exists(req.query.size) ? parseInt(req.query.size) : undefined;
    const filters = {
      // where: {...},
      // order: [...],
      offset: 0, //getOffsetByPageNumber(req.query.page, limit),
      limit: 1
    }
    console.log("TESTEEEEEE", req.query);

    productsTable.findAll(filters).then((response) => {
      res.status(200).json(response);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar a lista de produtos' })
    })
  };

  controller.getAllShort = (req, res) => {
    const fieldsToSelect = { attributes: ["id", "name", "description"] }
    productsTable.findAll(fieldsToSelect).then((response) => {
      res.status(200).json(response);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar a lista de produtos' })
    })
  };

  // Get product by id
  controller.getById = (req, res) => {
    const seqQuery = { where: { id: req.params.id } }
    productsTable.findAll(seqQuery).then((response) => {
      res.status(200).json(response);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu ao buscar o produto pelo id' })
    })
  };

  // Insert new product
  controller.insert = (req, res) => {
    const body = { ...req.body };
    // const body = {
    //   name: req.body.cardName,
    //   price: req.body.price,
    //   description: req.body.description,
    //   typeId: req.body.cardType,
    // };

    productsTable.create(body).then((response) => {
      res.status(200).json({ name: response.name, description: response.description });
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao inserir o produto' })
    })
  };

  // Update product
  controller.update = (req, res) => {
    const body = { ...req.body };
    const seqQuery = { where: { id: req.params.id } }

    productsTable.update(body, seqQuery).then(() => {
      res.status(200).json(true);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto' })
    })
  };

  // Delete product
  controller.delete = (req, res) => {
    const seqQuery = { where: { id: req.params.id } }
    productsTable.destroy(seqQuery).then(() => {
      res.status(200).json(true);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Ocorreu um erro ao excluir o produto' })
    })
  };

  return controller;
}