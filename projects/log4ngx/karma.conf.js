// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const setBaseKarmaConf = require('./karma-base.conf.js');

module.exports = function (config) {
  setBaseKarmaConf(config);

  config.set({
    plugins: config.plugins.concat([
      require('karma-chrome-launcher'),
      require('karma-edge-launcher'),
      require('karma-firefox-launcher')
// TODO: IE is currently omitted until we can work out how to fix the JS errors
      // require('karma-ie-launcher'),
    ]),
    browsers: ['Chrome', 'Firefox', 'Edge'],
    reporters: ['progress', 'kjhtml', 'coverage-istanbul']
  });
};
