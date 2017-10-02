import { TestBed, inject } from '@angular/core/testing';

import { LogService } from './log.service';
import { LogServiceConfig } from './log-service-config';
import { ConsoleAppender, consoleAppenderToken } from './appenders/console-appender';
import { ConsoleAppenderConfig } from './appenders/console-appender-config';

const logServiceConfig: LogServiceConfig = {
  appenders: [
    {
      name: 'consoleAppender',
      providerToken: consoleAppenderToken,
// tslint:disable-next-line:max-line-length
      layoutPattern: 'ConsoleAppender: {date-iso} {level} {logger} {message}{crlf}{exception-name} - {exception-message}{crlf}{exception-stack}'
    } as ConsoleAppenderConfig
  ],
  loggers: [
    {
      loggerName: '',
      level: 'debug',
      appenderNames: [
        'consoleAppender'
      ]
    }
  ]
};

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogService,
// TODO: use mock console service so output can be tested
        { provide: consoleAppenderToken, useClass: ConsoleAppender },
// TODO: create additional mock appender type for testing??
        { provide: LogServiceConfig, useValue: logServiceConfig },
      ]
    });
  });


});
