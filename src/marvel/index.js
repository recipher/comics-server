const crypto = require('crypto');
const axios = require('axios');
const config = require('../config');

const key = {
  public: config.marvel.key.public,
  private: config.marvel.key.private
};

const host = 'http://gateway.marvel.com/v1/public';

const generateHash = (ts, publicKey, privateKey) => {
  const key = `${ts}${privateKey}${publicKey}`;

  return crypto.createHash('md5').update(key).digest('hex');
};

const marvel = {
  get: async (url, params) => {
    const ts = new Date().getTime();

    const options = {
      ts,
      apikey: key.public,
      hash: generateHash(ts, key.public, key.private)
    };

    const response = await axios.get(`${host}${url}`, { params: { ...options, ...params }});

    return response.data;
  }
};

module.exports = marvel;