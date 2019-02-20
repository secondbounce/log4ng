import { AppenderConfig } from './appenders/appender-config';
import { LoggerConfig } from './logger-config';

export class LogServiceConfig {
  public appenders: AppenderConfig[];
  public loggers: LoggerConfig[];
}
