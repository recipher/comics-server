const stub = {
  get: async (ctx) => {
    ctx.body = { ping: true };
  }
};

module.exports = stub;
