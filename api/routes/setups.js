module.exports = app => {
  const controller = app.controllers.setups;

  // app.route('/setup/all').get(controller.getAll);
  app.route('/setup').post(controller.insert);
  // app.route('/setup/:id').put(controller.update);
  // app.route('/setup/:id').delete(controller.delete);
}