import { Injector } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { ConsoleService } from '../console.service';
import { Level } from '../level';
import { LogServiceConfig } from '../log-service-config';
import { LogService } from '../log.service';
import { Logger } from '../logger';
import { ConsoleAppender, consoleAppenderToken } from './console-appender';
import { ConsoleAppenderConfig } from './console-appender-config';

const logServiceConfig: LogServiceConfig = {
  appenders: [
    {
      name: 'consoleAppender',
      providerToken: consoleAppenderToken,
      logFormat: '{message}',
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

describe('ConsoleAppender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsoleService,
        Injector,
        LogService,
        { provide: LogServiceConfig, useValue: logServiceConfig },
        { provide: consoleAppenderToken, useClass: ConsoleAppender }
      ]
    });

    /* console.log() isn't used so doesn't need a spy */
    spyOn(console, 'debug');
    spyOn(console, 'error');
    spyOn(console, 'info');
    spyOn(console, 'trace');
    spyOn(console, 'warn');
  });

// tslint:disable: no-console
  it('should render debug messages via console.debug()', inject([Injector], (injector: Injector) => {
    const logService: LogService = new LogService(injector, logServiceConfig);
    const log: Logger = logService.getLogger('ConsoleAppenderTest-debug');
    const message: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';

    log.debug(message);
    expect(console.debug).toHaveBeenCalledWith(message);
  }));

  it('should render error messages via console.error()', inject([Injector], (injector: Injector) => {
    const logService: LogService = new LogService(injector, logServiceConfig);
    const log: Logger = logService.getLogger('ConsoleAppenderTest-debug');
    const message: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';

    log.error(message);
    expect(console.error).toHaveBeenCalledWith(message);
  }));

  it('should render info messages via console.info()', inject([Injector], (injector: Injector) => {
    const logService: LogService = new LogService(injector, logServiceConfig);
    const log: Logger = logService.getLogger('ConsoleAppenderTest-info');
    const message: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';

    log.info(message);
    expect(console.info).toHaveBeenCalledWith(message);
  }));

  it('should render warn messages via console.warn()', inject([Injector], (injector: Injector) => {
    const logService: LogService = new LogService(injector, logServiceConfig);
    const log: Logger = logService.getLogger('ConsoleAppenderTest-warn');
    const message: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';

    log.warn(message);
    expect(console.warn).toHaveBeenCalledWith(message);
  }));

  it('should render levels below \'debug\' via console.trace()', inject([Injector], (injector: Injector) => {
    const debugLevel: Level = Level.getLevel('debug');
    const value: number = debugLevel.value - 1;
    const levelName: string = 'trace-' + Math.random().toString();
    const customLevel: Level = new Level(value, levelName, 'TRACE');

    logServiceConfig.loggers[0].level = levelName;
    const logService: LogService = new LogService(injector, logServiceConfig);
    const log: Logger = logService.getLogger('ConsoleAppenderTest-warn');
    const message: string = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`1234567890-=[];\'#\\,./¬!"£$%^&*()_+{}:@~|<>?';

    log.log(levelName, message);
    expect(console.trace).toHaveBeenCalledWith(message);
  }));

// tslint:enable: no-console
});
