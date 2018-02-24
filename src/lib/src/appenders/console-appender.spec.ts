import { TestBed, inject } from '@angular/core/testing';

import { Logger } from '../logger';
import { LogService } from '../log.service';
import { LogServiceConfig } from '../log-service-config';
import { ConsoleAppender, consoleAppenderToken } from './console-appender';
import { ConsoleAppenderConfig } from './console-appender-config';
import { ConsoleService } from '../console.service';
import { MockConsoleService } from '../mock-console.service';

const logServiceConfig: LogServiceConfig = {
  appenders: [
    {
      name: 'consoleAppender',
      providerToken: consoleAppenderToken,
// tslint:disable-next-line:max-line-length
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

describe('ConsoleAppender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogService,
        { provide: consoleAppenderToken, useClass: ConsoleAppender },
        { provide: ConsoleService, useClass: MockConsoleService },
        { provide: LogServiceConfig, useValue: logServiceConfig },
      ]
    });
  });

/*
* loggers vs appenders vs levels
*/

// TODO: exercise the log service
  it('should create service',
     inject([
       LogService
     ],
     (logService: LogService) => {
    const log: Logger = logService.getLogger('ConsoleAppenderTest');
    log.debug('foo');
    expect(MockConsoleService.lastOutput).toContain('foo');

  }));
});



// describe('LibComponent', function () {
//   let de: DebugElement;
//   let comp: LibComponent;
//   let fixture: ComponentFixture<LibComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [LibComponent]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LibComponent);
//     comp = fixture.componentInstance;
//     de = fixture.debugElement.query(By.css('h2'));
//   });

//   it('should create component', () => expect(comp).toBeDefined());

//   it('should have expected <h2> text', () => {
//     fixture.detectChanges();
//     const h2 = de.nativeElement;
//     expect(h2.innerText).toMatch(/angular/i,
//       '<h2> should say something about "Angular"');
//   });
// });
