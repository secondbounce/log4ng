import { InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { AppenderConfig } from './appender-config';
import { ConsoleAppenderConfig } from './console-appender-config';
import { Level } from '../level';
import { LoggingEvent } from '../logging-event';

export let consoleAppenderToken: InjectionToken<ConsoleAppender> = new InjectionToken<ConsoleAppender>('ConsoleAppender');

export class ConsoleAppender extends Appender {
  public initialize(config: ConsoleAppenderConfig): void {
    super.initialize(config);
  }

  protected append(loggingEvent: LoggingEvent): void {
    const message: string = this.renderLoggingEvent(loggingEvent);
    const loggingLevel: number = loggingEvent.level.value;

/* tslint:disable:no-console */
    switch (true) {
      case loggingLevel >= Level.error.value:
        console.error(message);
        break;

      case loggingLevel >= Level.warn.value:
        console.warn(message);
        break;

      case loggingLevel >= Level.info.value:
        console.info(message);
        break;

      case loggingLevel >= Level.debug.value:
        console.debug(message);
        break;

      default:
        console.trace(message);
        break;
    }
/* tslint:enable:no-console */
  }

  // protected renderLoggingEvent(loggingEvent: LoggingEvent): string {
  //   let message: string = this.layoutPattern;
  //   message = message.split('{level}').join(loggingEvent.level.displayName);
  //   message = message.split('{logger}').join(loggingEvent.loggerName);
  //   message = message.split('{message}').join(loggingEvent.message);
  //   message = message.split('{timestamp}').join(loggingEvent.timestamp.toString(10));

  //   const date: Date = new Date(loggingEvent.timestamp);
  //   message = message.split('{date}').join(date.toDateString());              // Mon Aug 07 2017
  //   message = message.split('{date-iso}').join(date.toISOString());           // 2017-08-07T14:53:34.329Z
  //   message = message.split('{date-short}').join(date.toLocaleDateString());  // 07/08/2017
  //   message = message.split('{datetime}').join(date.toLocaleString());        // 07/08/2017, 15:53:34
  //   message = message.split('{time}').join(date.toLocaleTimeString());        // 15:53:34
  //   message = message.split('{date-utc}').join(date.toUTCString());           // Mon, 07 Aug 2017 14:53:34 GMT

  //   let exName: string = '';
  //   let exMessage: string = '';
  //   let exStack: string = '';

  //   if (loggingEvent.exception) {
  //     const exception: Error = loggingEvent.exception;
  //     exName = exception.name;
  //     exMessage = exception.message;
  //     exStack = exception.stack;
  //   }

  //   message = message.split('{exception-name}').join(exName);
  //   message = message.split('{exception-message}').join(exMessage);
  //   message = message.split('{exception-stack}').join(exStack);

  //   message = message.split('{crlf}').join('\r\n');
  //   message = message.split('{lf}').join('\n');

  //   return message;
  // }
}
