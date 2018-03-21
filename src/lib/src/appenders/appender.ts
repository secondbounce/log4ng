import { AppenderConfig } from './appender-config';
import { LoggingEvent } from '../logging-event';

export abstract class Appender {
  private _name: string;
  private _logFormat: string;
  private _exceptionFormat: string;

  public initialize(config: AppenderConfig): void {
    this._name = config.name;
    this._logFormat = config.logFormat;
    this._exceptionFormat = config.exceptionFormat  || '{crlf}{exception-name}: {exception-message}{crlf}{exception-stack}';
  }

  public get name(): string {
    return this._name;
  }

  public get logFormat(): string {
    return this._logFormat;
  }

  public get exceptionFormat(): string {
    return this._exceptionFormat;
  }

  public doAppend(loggingEvent: LoggingEvent): void {
    // if (loggingEvent.level.value >= this.threshold.value) {
      // Checks that the IFilter chain accepts the loggingEvent.
      // Calls [M:PreAppendCheck()] and checks that it returns true.
      this.append(loggingEvent);
    // }
  }

  protected abstract append(loggingEvent: LoggingEvent): void;

  protected renderLoggingEvent(loggingEvent: LoggingEvent): string {
    let logMessage: string = this._logFormat;
    logMessage = logMessage.split('{level}').join(loggingEvent.level.displayName);
    logMessage = logMessage.split('{logger}').join(loggingEvent.loggerName);
    logMessage = logMessage.split('{message}').join(this.getSafeMessage(loggingEvent.message));
    logMessage = logMessage.split('{timestamp}').join(loggingEvent.timestamp.toString());

    const date: Date = new Date(loggingEvent.timestamp);
    logMessage = logMessage.split('{date}').join(date.toDateString());              // Mon Aug 07 2017
    logMessage = logMessage.split('{date-iso}').join(date.toISOString());           // 2017-08-07T14:53:34.329Z
    logMessage = logMessage.split('{date-short}').join(date.toLocaleDateString());  // 07/08/2017
    logMessage = logMessage.split('{datetime}').join(date.toLocaleString());        // 07/08/2017, 15:53:34
    logMessage = logMessage.split('{time}').join(date.toLocaleTimeString());        // 15:53:34
    logMessage = logMessage.split('{date-utc}').join(date.toUTCString());           // Mon, 07 Aug 2017 14:53:34 GMT

    let exceptionMessage: string = '';
    if (loggingEvent.exception) {
      exceptionMessage = this.renderException(loggingEvent.exception);
    }

    logMessage = logMessage.split('{exception}').join(exceptionMessage);

    logMessage = logMessage.split('{crlf}').join('\r\n');
    logMessage = logMessage.split('{lf}').join('\n');

    return logMessage;
  }

  protected renderException(exception: Error): string {
    let logMessage: string = this._exceptionFormat;

    logMessage = logMessage.split('{exception-name}').join(exception.name);
    logMessage = logMessage.split('{exception-message}').join(this.getSafeMessage(exception.message));
    logMessage = logMessage.split('{exception-stack}').join(exception.stack);

    logMessage = logMessage.split('{crlf}').join('\r\n');
    logMessage = logMessage.split('{lf}').join('\n');

    return logMessage;
  }

  private getSafeMessage(message: string): string {
    if (message === null) {
      message = '[null]';
    } else if (typeof message === 'undefined') {
      message = '[undefined]';
    }

    return message;
  }
}
