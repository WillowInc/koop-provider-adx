// Define the provider path
// /:name/:hosts?/:disableIdParam?/FeatureServer/:layer/:method
// e.g. /example/FeatureServer/0/query
const provider = {
  type: 'provider',
  name: 'adx',
  hosts: false, // if true, also adds disableIdParam
  disableIdParam: false, // if true, adds to path and req.params
  Model: require('./model'),
  version: require('../package.json').version,
};

module.exports = provider;
