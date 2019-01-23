const marvel = require('../../../marvel');
const mapper = require('./mapper');

const finder = context => {
  return {
    list: async options => {
      const response = await marvel.get('/characters', options);

      return response.data.results.map(mapper);
    }
  }
};

module.exports = finder;