module.exports = app => {
  const controller = app.controllers.prices;

  app.route('/prices').get(controller.getAll);
  app.route('/prices').post(controller.insert);
  app.route('/prices/:id').put(controller.update);
  app.route('/prices/:id').delete(controller.delete);
}