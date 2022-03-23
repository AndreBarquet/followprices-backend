(async () => {
  const database = require('./db');
  const Produto = require('./product');

  try {
    const resultado = await database.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
})();