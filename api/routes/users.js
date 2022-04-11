module.exports = app => {
  const controller = app.controllers.users;

  app.route('/login').post(controller.login);
}