const path = require('path');
const nconf = require('nconf');

const environment = process.env.NODE_ENV || 'development';

nconf.argv();
nconf.env({ separator: '__', lowerCase: true });
nconf.file('fileenv', {
  file: path.join(
    __dirname,
    '..',
    'config',
    `${environment}.json`
  )
});
nconf.file('filemain', {
  file: path.join(__dirname, '..', 'config', 'config.json')
});

module.exports = nconf.get();
