import { Injectable, InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { AppenderConfig } from './appender-config';
import { ConsoleAppenderConfig } from './console-appender-config';
import { ConsoleService } from '../console.service';
import { Level } from '../level';
import { LoggingEvent } from '../logging-event';

export let consoleAppenderToken: InjectionToken<Appender> = new InjectionToken<Appender>('ConsoleAppender');

@Injectable()
export class ConsoleAppender extends Appender {
  constructor(private consoleService: ConsoleService) {
    super();
  }

  public initialize(config: ConsoleAppenderConfig): void {
    super.initialize(config);
  }

  protected append(loggingEvent: LoggingEvent): void {
    const message: string = this.renderLoggingEvent(loggingEvent);
    const loggingLevel: number = loggingEvent.level.value;

    switch (true) {
      case loggingLevel >= Level.error.value:
        this.consoleService.error(message);
        break;

      case loggingLevel >= Level.warn.value:
        this.consoleService.warn(message);
        break;

      case loggingLevel >= Level.info.value:
        this.consoleService.info(message);
        break;

      case loggingLevel >= Level.debug.value:
        this.consoleService.debug(message);
        break;

      default:
        this.consoleService.trace(message);
        break;
    }
  }
}
