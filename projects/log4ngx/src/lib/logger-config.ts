import { Level } from './level';

export class LoggerConfig {
  public loggerName: string;
  public level: string;
  public appenderNames: string[];

  /*
{
  appenders: [
    {
      type
    }
  ],
  loggers: [
    {
      loggerName: "*",
      level: "DEBUG",
      appenderName: "consoleAppender"
    }
  ]
}

<log4net>
    <appender name="Console" type="log4net.Appender.ConsoleAppender">
        <layout type="log4net.Layout.PatternLayout">
            <!-- Pattern to output the caller's file name and line number -->
            <conversionPattern value="%5level [%thread] (%file:%line) - %message%newline" />
        </layout>
    </appender>

    <appender name="RollingFile" type="log4net.Appender.RollingFileAppender">
        <file value="example.log" />
        <appendToFile value="true" />
        <maximumFileSize value="100KB" />
        <maxSizeRollBackups value="2" />

        <layout type="log4net.Layout.PatternLayout">
            <conversionPattern value="%level %thread %logger - %message%newline" />
        </layout>
    </appender>

    <root>
        <level value="DEBUG" />
        <appender-ref ref="Console" />
        <appender-ref ref="RollingFile" />
    </root>

    <logger name="LoggerName">
        <level value="DEBUG" />
        <appender-ref ref="ConsoleAppender" />
    </logger>

</log4net>










*/
}
