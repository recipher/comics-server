const Router = require('koa-router');
const config = require('../../config');
const router = new Router();
const handlers = require('./' + config.handlers);

const setup = (app) => {
  router.get('/comics', handlers.comics.get);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

module.exports = {
  setup
};
