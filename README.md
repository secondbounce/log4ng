# log4ngx
log4ngx is a Typescript logging framework for Angular projects, based on concepts used in Log4j, Log4net, etc.

## Concepts
### LogService
The `LogService` is the factory with which you instantiate `Loggers` in each of the components, services, etc, in which you wish to log messages.  Behind the scenes, it also orchestrates the dispatch of messages from the `Loggers` to the appropriate `Appenders`.

### LogServiceConfig
The `LogService` is configured using an instance of the `LogServiceConfig`, typically created in your application's main module.  The configuration defines the parameters used with each `Appender` and how each `Appender` relates to the various `Loggers`.

### Loggers
`Loggers` provide access to the methods for logging messages at the required `Level`.  Each class - i.e. component, module or service - will usually define its own `Logger` which will identify that class within any messages logged via it.

### Appenders
`Appenders` are responsible for sending log entries to the underlying target or service.  Configuration will normally depend on the target/service, but all `Appenders` are configured with the layout format for messages logged to them.

## Installing
## Configuration
### Layout formatting

{level}
{logger}
{message}
{timestamp}
{date}        // Mon Aug 07 2017
{date-iso}    // 2017-08-07T14:53:34.329Z
{date-short}  // 07/08/2017
{datetime}    // 07/08/2017, 15:53:34
{time}        // 15:53:34
{date-utc}    // Mon, 07 Aug 2017 14:53:34 GMT
{exception-name}
{exception-message}
{exception-stack}
{crlf}
{lf}

## Contributing
