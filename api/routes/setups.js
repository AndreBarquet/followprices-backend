module.exports = app => {
  const controller = app.controllers.setups;

  app.route('/setup/all').get(controller.getAll);
  app.route('/setup').post(controller.insert);
  app.route('/setup/availableDates/:id').get(controller.getAvailableDates);
  app.route('/setup/details/:id').get(controller.getLatestDetails);
  app.route('/setup/details/evolution/:id').get(controller.getDetailsEvolution);
  app.route('/setup/details/date/:id').get(controller.getSetupDetailsByDate);


  // app.route('/setup/:id').put(controller.update);
  // app.route('/setup/:id').delete(controller.delete);
}