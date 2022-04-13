module.exports = app => {
  const controller = app.controllers.products;

  app.route('/product/all').get(controller.getAll);
  app.route('/product/short').get(controller.getAllShort);
  app.route('/product/grouped').get(controller.getGroupedByType);
  app.route('/product/detail/:id').get(controller.getById);
  app.route('/product').post(controller.insert);
  app.route('/product/:id').put(controller.update);
  app.route('/product/:id').delete(controller.delete);
}