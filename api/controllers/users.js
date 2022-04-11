const { Op } = require('@sequelize/core');


module.exports = app => {
  const { usersTable } = require('../../models/dbTables');
  const controller = {};

  // Get all prices list
  controller.login = (req, res) => {
    const where = { [Op.and]: [{ email: req.body.email, password: req.body.password }] };

    usersTable.findOne({ where }).then((response) => {
      if (response === null) {
        res.status(200).json({ error: 'Email ou senha errados, usuário não encontrado' });
        return;
      }

      res.status(200).json(response);
    }).catch(err => {
      console.log("ERROR...:", err);
      res.status(500).json({ error: 'Email ou senha errados, usuário não encontrado' })
    })
  };

  return controller;
}