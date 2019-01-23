const getTime = require('date-fns/get_time');
const log = require('../logger');

const logResponse = async (ctx, next) => {
  const then = getTime(new Date());

  await next();

  const now = getTime(new Date());

  const elapsed = now - then;
  const url = ctx.request.url;

  log.info({
    elapsed,
    url
  });
};

module.exports = logResponse;
