module.exports = app => {
  const controller = app.controllers.types;

  app.route('/type/all').get(controller.getAll);
  app.route('/type/short').get(controller.getAllShort);
  app.route('/type/detail/:id').get(controller.getById);
  app.route('/type').post(controller.insert);
  app.route('/type/:id').put(controller.update);
  app.route('/type/:id').delete(controller.delete);
}