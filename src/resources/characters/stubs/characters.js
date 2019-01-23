const data = {
  characters: [
    {
      
    }
  ],
  meta: {

  }
};

const stub = {
  get: async (ctx) => {
    ctx.body = data;
  }
};

module.exports = stub;
