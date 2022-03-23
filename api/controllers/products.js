
module.exports = app => {
  const productsDB = require('../../models/productsTable');
  const controller = {};

  // Get all products list
  controller.getAll = (req, res) => {
    productsDB.findAll().then((response) => {
      res.status(200).json(response);
    }).catch(err => console.log("FIND ALL ERROR...:", err))
  };

  // Get product by id
  controller.getById = (req, res) => {
    const seqQuery = { where: { id: req.params.id } }
    productsDB.findAll(seqQuery).then((response) => {
      res.status(200).json(response);
    }).catch(err => console.log("FIND ALL ERROR...:", err))
  };

  // Insert new project
  controller.insert = (req, res) => {
    // const insertBody = {
    //   name: req.body.cardName,
    //   price: req.body.price,
    //   description: req.body.description,
    //   typeId: req.body.cardType,
    // };

    productsDB.create({ ...req.body }).then((response) => {
      res.status(200).json({ name: response.name, description: response.description });
    }).catch(err => res.status(500).json({ error: 'Ocorreu um erro ao inserir a placa de video' }))
  };

  return controller;
}