const winston = require('winston');
const config = require('./config');
const format = winston.format;

winston.configure({
  transports: [
    new winston.transports.Console({
      timestamp: false,
      format: format.printf(info => JSON.stringify(info, null, 2)),
      level: config.logging.level || 'debug'
    })
  ]
});

const debug = (str, metadata) => winston.debug(str, metadata);
const info = (str, metadata) => winston.info(str, metadata);
const warn = (str, metadata) => winston.warn(str, metadata);
const error = (str, metadata) => winston.error(str, metadata);

module.exports = {
  debug,
  info,
  warn,
  error
};
