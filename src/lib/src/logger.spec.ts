import { TestBed, inject } from '@angular/core/testing';

describe('Logger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
// TODO: use mock log service so results can be examined in dispatch()
    //     LogService,
    //     { provide: consoleAppenderToken, useClass: ConsoleAppender },
    //     { provide: LogServiceConfig, useValue: logServiceConfig },
      ]
    });
  });

/*
* constructor()

* debug(message: string)
* debug(message: string, exception?: Error)
* info(message: string)
* info(message: string, exception?: Error)
* warn(message: string)
* warn(message: string, exception?: Error)
* error(message: string)
* error(message: string, exception?: Error)
* fatal(message: string)
* fatal(message: string, exception?: Error)
  * loggingEvent.level
  * loggingEvent.loggerName
  * loggingEvent.message
  * loggingEvent.exception
*/

  // xit('', () => {
  // });
});
