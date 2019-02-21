import { Level } from './level';
import { LogService } from './log.service';
import { LoggingEvent } from './logging-event';

export class Logger {
  constructor(public readonly name: string,
              private readonly logService: LogService) {
  }

  public debug(messageOrException: string | Error): void;
  public debug(message: string, exception: Error): void;
  public debug(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.debug, messageOrException, exception);
  }

  public info(messageOrException: string | Error): void;
  public info(message: string, exception: Error): void;
  public info(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.info, messageOrException, exception);
  }

  public warn(messageOrException: string | Error): void;
  public warn(message: string, exception: Error): void;
  public warn(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.warn, messageOrException, exception);
  }

  public error(messageOrException: string | Error): void;
  public error(message: string, exception: Error): void;
  public error(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.error, messageOrException, exception);
  }

  public fatal(messageOrException: string | Error): void;
  public fatal(message: string, exception: Error): void;
  public fatal(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.fatal, messageOrException, exception);
  }

  public log(levelName: string, messageOrException: string | Error): void;
  public log(levelName: string, message: string, exception: Error): void;
  public log(levelName: string, messageOrException: string | Error, exception?: Error): void {
    const level: Level = Level.getLevel(levelName);
    this.dispatchLoggingEvent(level, messageOrException, exception);
  }

  private dispatchLoggingEvent(level: Level, messageOrException: string | Error, exception?: Error): void {
    let message: string;

    if (messageOrException instanceof Error) {
      message = '';      /* Use empty string, otherwise 'null' or 'undefined' will be output */
      exception = messageOrException;
    } else {
      message = messageOrException;
      exception = exception;
    }

    const loggingEvent: LoggingEvent = new LoggingEvent();
    loggingEvent.level = level;
    loggingEvent.loggerName = this.name;
    loggingEvent.message = message;
    loggingEvent.exception = exception;

    this.logService.dispatch(loggingEvent);
  }
}
