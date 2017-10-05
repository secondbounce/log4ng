import { Injectable, Injector } from '@angular/core';

import { Appender } from './appenders/appender';
import { Level } from './level';
import { Logger } from './logger';
import { LoggerConfig } from './logger-config';
import { LoggingEvent } from './logging-event';
import { LogServiceConfig } from './log-service-config';

@Injectable()
export class LogService {
  private loggers: { [key: string]: Logger } = {};
  private appenders: { [key: string]: Appender } = {};
  private loggerConfigs: { [key: string]: LoggerConfig } = {};

  constructor(injector: Injector,
              config: LogServiceConfig) {
    for (const appenderConfig of config.appenders) {
      const appender: Appender = injector.get(appenderConfig.providerToken);
      appender.initialize(appenderConfig);

      this.appenders[appender.name] = appender;
    }

    for (const loggerConfig of config.loggers) {
      this.loggerConfigs[loggerConfig.loggerName] = loggerConfig;
    }
  }

  public getLogger(name: string): Logger {
    let logger: Logger = this.loggers[name];

    if (!logger) {
      logger = new Logger(name, this);
      this.loggers[name] = logger;
    }

    return logger;
  }

  public dispatch(loggingEvent: LoggingEvent): void {
// TODO: what if more than one loggerconfig is present for the same name? (Test)
    let loggerConfig: LoggerConfig = this.loggerConfigs[loggingEvent.loggerName];
// TODO: should root config only be used if logger-specific one isn't found or in addition to it?
    if (!loggerConfig) {
      loggerConfig = this.loggerConfigs[''];
    }

    if (loggerConfig) {
      const level: Level = Level.getLevel(loggerConfig.level);

      /* Need to check if a level was returned just in case the name in the config is wrong */
      if (   level
          && loggingEvent.level.value >= level.value) {
        for (const appenderName of loggerConfig.appenderNames) {
          const appender: Appender = this.appenders[appenderName];
          if (appender) {
            appender.doAppend(loggingEvent);
          }
        }
      }
    }
  }
}
