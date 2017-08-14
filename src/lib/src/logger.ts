import { Level } from './level';
import { LoggingEvent } from './logging-event';
import { LogService } from './log.service';

export class Logger {
  constructor(public readonly name: string,
              private readonly logService: LogService) {
  }

  public get isDebugEnabled(): boolean {
    return this.logService.isLevelEnabled(Level.debug);
  }

  public get isInfoEnabled(): boolean {
    return this.logService.isLevelEnabled(Level.info);
  }

  public get isWarnEnabled(): boolean {
    return this.logService.isLevelEnabled(Level.warn);
  }

  public get isErrorEnabled(): boolean {
    return this.logService.isLevelEnabled(Level.error);
  }

  public get isFatalEnabled(): boolean {
    return this.logService.isLevelEnabled(Level.fatal);
  }

  public debug(message: string, exception?: Error): void {
    this.log(Level.debug, message, exception);
  }

  public info(message: string, exception?: Error): void {
    this.log(Level.info, message, exception);
  }

  public warn(message: string, exception?: Error): void {
    this.log(Level.warn, message, exception);
  }

  public error(message: string, exception?: Error): void {
    this.log(Level.error, message, exception);
  }

  public fatal(message: string, exception?: Error): void {
    this.log(Level.fatal, message, exception);
  }

  private log(level: Level, message: string, exception: Error): void {
    const loggingEvent: LoggingEvent = new LoggingEvent();
    loggingEvent.level = level;
    loggingEvent.loggerName = this.name;
    loggingEvent.message = message;
    loggingEvent.exception = exception;

    this.logService.dispatch(loggingEvent);
  }
}
