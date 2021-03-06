import { Injector } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { Level } from '../level';
import { LogServiceConfig } from '../log-service-config';
import { LogService } from '../log.service';
import { Logger } from '../logger';
import { AppenderConfig } from './appender-config';
import { MockAppender, mockAppenderToken } from './mock-appender';

const logServiceConfig: LogServiceConfig = {
  appenders: [
    {
      name: 'mockAppender',
      providerToken: mockAppenderToken,
      logFormat: 'MockAppender',
      exceptionFormat: null
    } as AppenderConfig
  ],
  loggers: [
    {
      loggerName: '',
      level: 'debug',
      appenderNames: [
        'mockAppender'
      ]
    }
  ]
};

describe('Base Appender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Injector,
        LogService,
        { provide: LogServiceConfig, useValue: logServiceConfig },
        { provide: mockAppenderToken, useClass: MockAppender }
      ]
    });
  });

  describe('name property', () => {
    it('should be stored correctly', () => {
      const name: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';
      const config: AppenderConfig = {
        name,
        providerToken: mockAppenderToken,
        logFormat: 'MockAppender',
        exceptionFormat: null
      };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.name).toBe(name);
    });
  });

  describe('logFormat property', () => {
    it('should be stored correctly', () => {
      const logFormat: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';
      const config: AppenderConfig = {
        name: 'mockAppender',
        providerToken: mockAppenderToken,
        logFormat,
        exceptionFormat: null
      };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.logFormat).toBe(logFormat);
    });

    it('should render levels using displayName property', inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '{level}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-level');

      Level.debug.displayName = `##${Level.debug.displayName}##`;
      log.debug('');
      expect(MockAppender.lastOutput).toBe(Level.debug.displayName);
      Level.info.displayName = `##${Level.info.displayName}##`;
      log.info('');
      expect(MockAppender.lastOutput).toBe(Level.info.displayName);
      Level.warn.displayName = `##${Level.warn.displayName}##`;
      log.warn('');
      expect(MockAppender.lastOutput).toBe(Level.warn.displayName);
      Level.error.displayName = `##${Level.error.displayName}##`;
      log.error('');
      expect(MockAppender.lastOutput).toBe(Level.error.displayName);
      Level.fatal.displayName = `##${Level.fatal.displayName}##`;
      log.fatal('');
      expect(MockAppender.lastOutput).toBe(Level.fatal.displayName);
    }));

    it('should render logger using name property', inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '{logger}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-logger');

      log.info('');
      expect(MockAppender.lastOutput).toBe(log.name);
    }));

    it('should render message', inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '{message}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-message');

      let message: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';
      log.info(message);
      expect(MockAppender.lastOutput).toBe(message);
      message = '      ';
      log.info(message);
      expect(MockAppender.lastOutput).toBe(message);
      message = '';
      log.info(message);
      expect(MockAppender.lastOutput).toBe(message);
      message = undefined;
      log.info(message);
      expect(MockAppender.lastOutput).toBe('[undefined]');
      message = null;
      log.info(message);
      expect(MockAppender.lastOutput).toBe('[null]');
    }));

    it('should render timestamp as numeric value', inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '{timestamp}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-timestamp');

      const timestamp: string = Date.now().toString();
// tslint:disable-next-line no-magic-numbers
      const pattern: string = timestamp.slice(0, timestamp.length - 2) + '\\d{2}';
      log.info('');
      expect(MockAppender.lastOutput).toMatch(new RegExp(pattern));
    }));

    it('should render date/times in correct format', inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '#{date}#{date-iso}#{date-short}#{datetime}#{time}#{date-utc}#';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-datetimes');

      /* We're replacing the seconds/milliseconds in each string, but this may still fail if the test is run on a minute
         boundary, causing that value to tick over too.
      */
      const date: Date = new Date();
      const dateString: string = date.toDateString();             // Mon Aug 07 2017
      let isoString: string = date.toISOString();                 // 2017-08-07T14:53:34.329Z
      isoString = isoString.slice(0, isoString.lastIndexOf('.') - 1) + '\\d\\.\\d+Z';
      const localeDateString: string = date.toLocaleDateString(); // 07/08/2017
      let localeString: string = date.toLocaleString();           // 07/08/2017, 15:53:34 (but may also include AM/PM indicator at end)
      localeString = localeString.replace(/\d([^\d]*)$/, '\\d$1');
      let localeTimeString: string = date.toLocaleTimeString();   // 15:53:34 (but may also include AM/PM indicator at end)
      localeTimeString = localeTimeString.replace(/\d([^\d]*)$/, '\\d$1');
      let utcString: string = date.toUTCString();                 // Mon, 07 Aug 2017 14:53:34 GMT
      utcString = utcString.slice(0, utcString.lastIndexOf(' ') - 1) + '\\d [A-Z]{2,3}';
      const pattern: string =   '#' + dateString + '#' + isoString + '#' + localeDateString
                              + '#' + localeString + '#' + localeTimeString + '#' + utcString + '#';

      log.info('');
      expect(MockAppender.lastOutput).toMatch(new RegExp(pattern));
    }));

    it('should render literal content and CR/LF', inject([ Injector ], (injector: Injector) => {
      const line1: string = ' Line1 ';
      const line2: string = ' Line2 ';
      const line3: string = ' Line3 ';
      logServiceConfig.appenders[0].logFormat = '{lf}' + line1 + '{crlf}' + line2 + '{lf}' + line3 + '{crlf}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-literals');

      const result: string = '\n' + line1 + '\r\n' + line2 + '\n' + line3 + '\r\n';
      log.info('');
      expect(MockAppender.lastOutput).toBe(result);
    }));

    it('should ignore exception if not specified in logFormat', inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '{message}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-exception');
      const message: string = 'MockAppenderTest-logFormat-exception';
      const errorMessage: string = 'TypeError for unit testing';

      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(message, ex);
      }

      expect(MockAppender.lastOutput).toBe(message);
    }));
  });

  describe('exceptionFormat property', () => {
    it('should be stored correctly', () => {
      const exceptionFormat: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';
      const config: AppenderConfig = {
        name: 'mockAppender',
        providerToken: mockAppenderToken,
        logFormat: 'MockAppender',
        exceptionFormat
      };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.exceptionFormat).toBe(exceptionFormat);
    });

    it('uses default value if set to null', inject([ Injector ], (injector: Injector) => {
      const appenderConfig: AppenderConfig = logServiceConfig.appenders[0];
      appenderConfig.logFormat = '{message} {exception}';
      appenderConfig.exceptionFormat = null;
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-exceptionFormat-null');

      /* We can't access the service's appenders directly to check that the default format is set,
         so we'll just have to infer it from the output.
      */
      const message: string = 'Message for null exceptionFormat';
      const errorMessage: string = 'TypeError for unit testing';
      const pattern: string = '^' + message + ' [.\\s]*';

      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(message, ex);
      }

      expect(MockAppender.lastOutput).toMatch(new RegExp(pattern));
    }));

    it('should render literal content and CR/LF', inject([ Injector ], (injector: Injector) => {
      const appenderConfig: AppenderConfig = logServiceConfig.appenders[0];
      const line1: string = ' Line1 ';
      const line2: string = ' Line2 ';
      const line3: string = ' Line3 ';
      appenderConfig.logFormat = '{exception}';
      appenderConfig.exceptionFormat = '{lf}' + line1 + '{crlf}' + line2 + '{lf}' + line3 + '{crlf}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-exceptionFormat');
      const errorMessage: string = 'TypeError for unit testing';

      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(ex);
      }

      const result: string = '\n' + line1 + '\r\n' + line2 + '\n' + line3 + '\r\n';
      expect(MockAppender.lastOutput).toBe(result);
    }));

    it('should render the exception name', inject([ Injector ], (injector: Injector) => {
      const appenderConfig: AppenderConfig = logServiceConfig.appenders[0];
      appenderConfig.logFormat = '{exception}';
      appenderConfig.exceptionFormat = '{exception-name}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-exceptionFormat-exceptionName');
      const errorMessage: string = 'TypeError for unit testing';
      let result: string;

      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        result = ex.constructor.name;
        log.error(ex);
      }

      expect(MockAppender.lastOutput).toBe(result);
    }));

    it('should render the exception message', inject([ Injector ], (injector: Injector) => {
      const appenderConfig: AppenderConfig = logServiceConfig.appenders[0];
      appenderConfig.logFormat = '{exception}';
      appenderConfig.exceptionFormat = '{exception-message}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-exceptionFormat-exceptionMessage');

      let errorMessage: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(ex);
      }
      expect(MockAppender.lastOutput).toBe(errorMessage);

      errorMessage = '      ';
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(ex);
      }
      expect(MockAppender.lastOutput).toBe(errorMessage);

      errorMessage = '';
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(ex);
      }
      expect(MockAppender.lastOutput).toBe(errorMessage);

      errorMessage = undefined;
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(ex);
      }
      expect(MockAppender.lastOutput).toBe('');   /* Chrome converts 'undefined' messages to an empty string */

      errorMessage = null;
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(ex);
      }
      expect(MockAppender.lastOutput).toBe('null');   /* Chrome converts null messages to the string 'null' */
    }));

    it('should render the exception stack', inject([ Injector ], (injector: Injector) => {
      const appenderConfig: AppenderConfig = logServiceConfig.appenders[0];
      appenderConfig.logFormat = '{exception}';
      appenderConfig.exceptionFormat = '{exception-stack}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-exceptionFormat-exceptionStack');
      const errorMessage: string = 'TypeError for unit testing';

      /* This is currently set to zero in karma-test-shim.js, so we'll need to reset it here if we're to
         see anything in the stack trace.
      */
      const previousLimit: number = Error.stackTraceLimit;
      Error.stackTraceLimit = Infinity;

      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        log.error(ex);
      }

      /* We can't guarantee the exact output in the stacktrace since each combination of browser, browser
         version, Angular, webpack and so on, all conspire to affect the output.  So it's HIGHLY likely that
         any package upgrades, etc, will cause this test to fail. So we'll try to use regexes that minimise
         the chance of failure.
      */
      const pattern: RegExp = /Edge/.test(window.navigator.userAgent) ? new RegExp(/at TestBedViewEngine\.prototype\.execute/)
                                                                      : new RegExp(/appender\.spec\.(ts|js)/);
      expect(MockAppender.lastOutput).toMatch(pattern);

      Error.stackTraceLimit = previousLimit;
    }));
  });
});
