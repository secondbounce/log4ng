import { Injectable, InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { AppenderConfig } from './appender-config';
import { LoggingEvent } from '../logging-event';

export let mockAppenderToken: InjectionToken<Appender> = new InjectionToken<Appender>('MockAppender');

/**
 * Mock appender class for testing the base Appender class
 */
@Injectable()
export class MockAppender extends Appender {
  public static lastOutput: string = null;

  public initialize(config: AppenderConfig): void {
    super.initialize(config);
  }

  protected append(loggingEvent: LoggingEvent): void {
    const message: string = this.renderLoggingEvent(loggingEvent);
    MockAppender.lastOutput = message;
  }
}
