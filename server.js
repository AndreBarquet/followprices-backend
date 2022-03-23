const app = require('./config/express')();
const port = app.get('port');

const database = require('./config/database');

async function createProductsTable() {
  try {
    const resultado = await database.sync();
  } catch (error) {
    console.log(error);
  }
}

database.authenticate()
  .then(createProductsTable)
  .catch(err => console.log("Error...:", err))


// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});