const Koa = require('koa');

const setup = () => {
  const app = new Koa();

  const middleware = require('./middleware');

  const comics = require('./resources/comics/routes');
  const characters = require('./resources/characters/routes');
  const pings = require('./resources/pings/routes');

  middleware.setup(app);

  pings.setup(app);
  comics.setup(app);
  characters.setup(app);

  return app;
};

module.exports = setup;
