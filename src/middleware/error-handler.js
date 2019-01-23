const format = require('date-fns/format');
const log = require('../logger');

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const now = new Date();
    const statusCode = e.statusCode || 500;
    const timestamp = format(now, 'YYYY-MM-DDTHH:mm:ss');

    const message = e.message;
    const url = ctx.request.url;

    ctx.response.status = statusCode;
    ctx.body = { message, statusCode };

    log.error({
      statusCode,
      timestamp,
      message,
      url
    });
  }
};

module.exports = errorHandler;
