import { AppenderConfig } from './appender-config';
import { LoggingEvent } from '../logging-event';

export abstract class Appender {
  private _name: string;
  // public readonly threshold: Level;
  private _layoutPattern: string;
  // Public property	ErrorHandler      // Gets or sets the IErrorHandler for this appender.
  // Public property	FilterHead      // The filter chain.

  public initialize(config: AppenderConfig/*, threshold: Level*/): void {
    this._name = config.name;
    // this.threshold = threshold;
    this._layoutPattern = config.layoutPattern;
  }

  public get name(): string {
    return this._name;
  }

  public get layoutPattern(): string {
    return this._layoutPattern;
  }

  public doAppend(loggingEvent: LoggingEvent): void {
    // if (loggingEvent.level.value >= this.threshold.value) {
      // Checks that the IFilter chain accepts the loggingEvent.
      // Calls [M:PreAppendCheck()] and checks that it returns true.
      this.append(loggingEvent);
    // }
  }

  protected abstract append(loggingEvent: LoggingEvent): void;
  // protected abstract renderLoggingEvent(loggingEvent: LoggingEvent): string;

  protected renderLoggingEvent(loggingEvent: LoggingEvent): string {
    let message: string = this.layoutPattern;
    message = message.split('{level}').join(loggingEvent.level.displayName);
    message = message.split('{logger}').join(loggingEvent.loggerName);
    message = message.split('{message}').join(loggingEvent.message);
    message = message.split('{timestamp}').join(loggingEvent.timestamp.toString());

    const date: Date = new Date(loggingEvent.timestamp);
    message = message.split('{date}').join(date.toDateString());              // Mon Aug 07 2017
    message = message.split('{date-iso}').join(date.toISOString());           // 2017-08-07T14:53:34.329Z
    message = message.split('{date-short}').join(date.toLocaleDateString());  // 07/08/2017
    message = message.split('{datetime}').join(date.toLocaleString());        // 07/08/2017, 15:53:34
    message = message.split('{time}').join(date.toLocaleTimeString());        // 15:53:34
    message = message.split('{date-utc}').join(date.toUTCString());           // Mon, 07 Aug 2017 14:53:34 GMT

    let exName: string = '';
    let exMessage: string = '';
    let exStack: string = '';

    if (loggingEvent.exception) {
      const exception: Error = loggingEvent.exception;
      exName = exception.name;
      exMessage = exception.message;
      exStack = exception.stack;
    }

    message = message.split('{exception-name}').join(exName);
    message = message.split('{exception-message}').join(exMessage);
    message = message.split('{exception-stack}').join(exStack);

    message = message.split('{crlf}').join('\r\n');
    message = message.split('{lf}').join('\n');

    return message;
  }
}
