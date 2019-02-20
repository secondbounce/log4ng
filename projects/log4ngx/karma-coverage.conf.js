const setBaseKarmaConf = require('./karma-base.conf.js');

module.exports = function (config) {
  setBaseKarmaConf(config);

  var outputDir = '../../coverage/log4ngx/remap';

  // Extended Configuration for Karma Coverage Reports
  config.set({
    plugins: config.plugins.concat([
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-remap-coverage')
    ]),
    preprocessors: {
      './src/lib/**/!(*spec).js': 'coverage'
    },
    browsers: ['ChromeNoSandbox'],
    customLaunchers: {
      ChromeNoSandbox: {  // See https://docs.travis-ci.com/user/chrome#Sandboxing
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['progress', 'kjhtml', 'coverage', 'remap-coverage'],
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      html: require('path').join(__dirname, outputDir),
      cobertura: outputDir + '/coverage.xml'
    },
    singleRun: true
  })
}
