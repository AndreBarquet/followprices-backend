module.exports = app => {
  const controller = app.controllers.prices;

  app.route('/price/all').get(controller.getAll);
  app.route('/price').post(controller.insert);
  app.route('/price/:id').put(controller.update);
  app.route('/price/:id').delete(controller.delete);
}