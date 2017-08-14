import { TestBed, inject } from '@angular/core/testing';

import { LogService } from './log.service';
import { LogServiceConfig } from './log-service-config';
import { ConsoleAppender, consoleAppenderToken } from './appenders/console-appender';
import { ConsoleAppenderConfig } from './appenders/console-appender-config';

const logServiceConfig: LogServiceConfig = {
  appenders: [
/*
{level}
{logger}
{message}
{timestamp}
{date}        // Mon Aug 07 2017
{date-iso}    // 2017-08-07T14:53:34.329Z
{date-short}  // 07/08/2017
{datetime}    // 07/08/2017, 15:53:34
{time}        // 15:53:34
{date-utc}    // Mon, 07 Aug 2017 14:53:34 GMT
{exception-name}
{exception-message}
{exception-stack}
{crlf}
{lf}
*/
    {
      name: 'consoleAppender',
      providerToken: consoleAppenderToken,
// tslint:disable-next-line:max-line-length
      layoutPattern: 'ConsoleAppender: {date-iso} {level} {logger} {message}{crlf}{exception-name} - {exception-message}{crlf}{exception-stack}',
      foo: ''
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
        { provide: consoleAppenderToken, useClass: ConsoleAppender },
        { provide: LogServiceConfig, useValue: logServiceConfig },
      ]
    });
  });

  it('should create service', inject([LogService], (service: LogService) => {
    expect(service).toBeTruthy();
  }));

// TODO: exercise the log service
  // it('should return 42 from getMeaning', inject([LogService], (service: LogService) => {
  //   expect(service.getMeaning()).toBe(42);
  // }));
});
