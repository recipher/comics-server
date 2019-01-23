const cors = require('@koa/cors');
const logResponse = require('./log-response');
const errorHandler = require('./error-handler');

const setup = function(app) {
  app.use(logResponse);
  app.use(cors({ 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*' }));
  app.use(errorHandler);
};

module.exports = {
  setup
};

      