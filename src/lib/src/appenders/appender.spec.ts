import { Injector } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';

import { AppenderConfig } from './appender-config';
import { Level } from '../level';
import { Logger } from '../logger';
import { LogService } from '../log.service';
import { LogServiceConfig } from '../log-service-config';
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
        { provide: mockAppenderToken, useClass: MockAppender },
      ]
    });
  });

  /* Note that we can't access the service's appenders directly to check its properties and methods;
     the tests here can merely check that the output corresponds to the expected values.
  */

  describe('logFormat property', () => {
    it('should render levels using displayName property',
       inject([ Injector ], (injector: Injector) => {
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

    it('should render logger using name property',
       inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '{logger}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-logger');

      log.info('');
      expect(MockAppender.lastOutput).toBe(log.name);
    }));

    it('should render message',
       inject([ Injector ], (injector: Injector) => {
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

    it('should render timestamp as numeric value',
       inject([ Injector ], (injector: Injector) => {
      logServiceConfig.appenders[0].logFormat = '{timestamp}';
      const logService: LogService = new LogService(injector, logServiceConfig);
      const log: Logger = logService.getLogger('MockAppenderTest-logFormat-timestamp');

      const timestamp: string = Date.now().toString();
// tslint:disable-next-line no-magic-numbers
      const pattern: string = timestamp.slice(0, timestamp.length - 2) + '\\d{2}';
      log.info('');
      expect(MockAppender.lastOutput).toMatch(new RegExp(pattern));
    }));

    it('should render date/times in correct format',
       inject([ Injector ], (injector: Injector) => {
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

    it('should render literal content and CR/LF',
       inject([ Injector ], (injector: Injector) => {
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

    it('should ignore exception if not specified in logFormat',
       inject([ Injector ], (injector: Injector) => {
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
    it('uses default value if set to null',
       inject([ Injector ], (injector: Injector) => {
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

    it('should render literal content and CR/LF',
       inject([ Injector ], (injector: Injector) => {
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

    it('should render the exception name',
       inject([ Injector ], (injector: Injector) => {
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

    it('should render the exception message',
       inject([ Injector ], (injector: Injector) => {
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

    it('should render the exception stack',
       inject([ Injector ], (injector: Injector) => {
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

      /* We can't guarantee the exact output in the stacktrace but it *should* contain the name of this test
         script (well, the equivalent JS filename, at any rate) so we'll look for that.

         ...Unless, of course, we're running under Edge which doesn't include the source file name <sigh>.
      */
      const pattern: RegExp = /Edge/.test(window.navigator.userAgent) ? new RegExp(/TestBed\.prototype\.execute/)
                                                                      : new RegExp(/appender\.spec\.js/);
      expect(MockAppender.lastOutput).toMatch(pattern);

      Error.stackTraceLimit = previousLimit;
    }));
  });
});
