const finder = require('../services/finder');

const comics = {
  get: async (ctx) => {
    const find = finder(ctx);

    const comics = await find.list(ctx.request.query);
    ctx.body = { comics };
  }
};

module.exports = comics;
