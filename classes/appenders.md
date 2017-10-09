---
layout: default
title: Appender class
---

# Appender
`Appenders` are responsible for sending log entries to the underlying target or service.  Configuration will normally depend on the target/service, but all `Appenders` are configured with the layout format for messages logged to them.

## Properties
### name

### logFormat
Doesn't currently support escaping of placeholder brackets

### exceptionFormat
'{crlf}{exception-name}: {exception-message}{crlf}{exception-stack}'


## Layout formatting
Messages logged via an `Appender` will be formatted according to the `logFormat` property.  This is a string containing literal and/or placeholder values.

| Placeholder  | Value |
|--------------|------------|
| {level}      |  |
| {logger}     |  |
| {message}    |  |
| {timestamp}  |  |
| {date}       | // Mon Aug 07 2017 |
| {date-iso}   | // 2017-08-07T14:53:34.329Z |
| {date-short} | // 07/08/2017 |
| {datetime}   | // 07/08/2017, 15:53:34 |
| {time}       | // 15:53:34 |
| {date-utc}   | // Mon, 07 Aug 2017 14:53:34 GMT |
| {exception}  |  |
| {crlf}       |  |
| {lf}         |  |



## Exception formatting

| Placeholder         | Value |
|---------------------|------------|
| {exception-name}    |  |
| {exception-message} |  |
| {exception-stack}   |  |
