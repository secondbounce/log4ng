const karmaConf = require('./karma.conf.js');
module.exports = function (config) {
  // Generic Karma Configuration
  karmaConf(config);

  // Extended configuration for running Karma tests under Travis
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter')
    ],
    autoWatch: false,
    browsers: ['Chrome', 'Firefox'],
    singleRun: true
  })
}