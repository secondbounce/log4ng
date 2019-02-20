const setBaseKarmaConf = require('./karma-base.conf.js');

module.exports = function (config) {
  setBaseKarmaConf(config);

  // Extended configuration for running Karma tests under Travis
  config.set({
    plugins: config.plugins.concat([
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher')
    ]),
    browsers: ['ChromeNoSandbox', 'Firefox'],
    customLaunchers: {
      ChromeNoSandbox: {  // See https://docs.travis-ci.com/user/chrome#Sandboxing
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    autoWatch: false,
    singleRun: true
  })
}
