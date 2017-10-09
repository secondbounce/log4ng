---
layout: default
title: Level class
---

# Level
Levels specify the importance and/or severity of the message being logged.  Within an appender class, a message's level may control the manner, formatting or any other aspect of the logging.  Within the context of the logging service however, the level of a particular message is only used in the configuration to determine whether it triggers the logging of the message or not.  This is accomplished by comparing the numeric value assigned to each level.

## Default Levels
A number of levels are provided by default:

| Level | Value |
|-------|-------|
| Debug | 100 |
| Info  | 200 |
| Warn  | 300 |
| Error | 400 |
| Fatal | 500 |
| Off   | number.MAX_VALUE |

### Properties


### changing display name

## custom levels

### defining
### using
