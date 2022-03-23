module.exports = app => {
  const controller = app.controllers.products;

  app.route('/product/all').get(controller.getAll);
  app.route('/product/detail/:id').get(controller.getById);
  app.route('/product').post(controller.insert);
}