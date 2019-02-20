import { Injectable, InjectionToken } from '@angular/core';

import { ConsoleService } from '../console.service';
import { Level } from '../level';
import { LoggingEvent } from '../logging-event';
import { Appender } from './appender';
import { ConsoleAppenderConfig } from './console-appender-config';

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
