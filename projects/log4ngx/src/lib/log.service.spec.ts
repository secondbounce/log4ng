import { inject, TestBed } from '@angular/core/testing';

import { ConsoleAppender, consoleAppenderToken } from './appenders/console-appender';
import { ConsoleAppenderConfig } from './appenders/console-appender-config';
import { LogServiceConfig } from './log-service-config';
import { LogService } from './log.service';

const logServiceConfig: LogServiceConfig = {
  appenders: [
    {
      name: 'consoleAppender',
      providerToken: consoleAppenderToken,
      logFormat: 'ConsoleAppender: {date-iso} {level} {logger} {message}{exception}',
      exceptionFormat: null
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
        { provide: LogServiceConfig, useValue: logServiceConfig }
      ]
    });
  });
});
