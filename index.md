---
layout: default
title: log4ng
---

# Log4ng
log4ng is a Typescript logging framework for Angular projects, based on concepts used in Log4j, Log4net, etc.

## Concepts
### [Loggers](/log4ng/classes/loggers)
`Loggers` provide access to the methods for logging messages at the required `Level`.  Each of your classes - i.e. components, modules or services - will usually define its own `Logger` which will identify that class within any messages logged via it.

### [LogService](/log4ng/classes/logservice)
The `LogService` is the factory with which you instantiate `Loggers` in each of the components, services, etc, in which you wish to log messages.  Behind the scenes, it also orchestrates the dispatch of messages from the `Loggers` to the appropriate `Appenders`.

### [Appenders](/log4ng/classes/appenders)
`Appenders` are responsible for sending log entries to the underlying target or service.  Configuration will normally depend on the target/service, but all `Appenders` are configured with the layout format for messages logged to them.

### [LogServiceConfig](/log4ng/classes/logserviceconfig)
The `LogService` is configured using an instance of the `LogServiceConfig`, typically created in your application's main module.  The configuration defines the parameters used with each `Appender` and how each `Appender` relates to the various `Loggers`.
