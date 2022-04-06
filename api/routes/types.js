module.exports = app => {
  const controller = app.controllers.types;

  app.route('/type/all').get(controller.getAll);
  app.route('/type/short').get(controller.getShort);
  app.route('/type').post(controller.insert);
  app.route('/type/:id').put(controller.update);
  app.route('/type/:id').delete(controller.delete);
}