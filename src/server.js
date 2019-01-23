const http = require('http');
const app = require('./app');
const config = require('./config');
const log = require('./logger');

const server = http.createServer(app().callback());

module.exports = server.listen(config.port, err => {
  if (err) return log.error(`Failed to start server`, err);
  log.info(`Server started on port ${config.port}`);
});
