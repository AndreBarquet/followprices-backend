module.exports = app => {
  const controller = app.controllers.products;

  app.route('/product/all').get(controller.getAllProducts);
}