const finder = require('../services/finder');

const characters = {
  get: async (ctx) => {
    const find = finder(ctx);

    const characters = await find.list(ctx.request.query);
    ctx.body = { characters };
  }
};

module.exports = characters;