import { AppenderConfig } from './appender-config';

export interface ConsoleAppenderConfig extends AppenderConfig {
// TODO: just a dummy property at the moment, just so we have an example of an appender-specific config
  foo: string;
}
