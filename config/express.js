const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const cors = require('cors');

const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
    'Accept',
    'Authorization',
    'X-Requested-With'
  ],
  optionsSuccessStatus: 200,
};

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  // CORS
  app.use(cors(corsOpts))

  // ENDPOINTS
  consign({ cwd: 'api' })
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};