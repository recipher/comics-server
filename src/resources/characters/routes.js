const Router = require('koa-router');
const config = require('../../config');
const router = new Router();
const handlers = require('./' + config.handlers);

const setup = (app) => {
  router.get('/characters', handlers.characters.get);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

module.exports = {
  setup
};
