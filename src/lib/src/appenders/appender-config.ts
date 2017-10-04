import { OpaqueToken } from '@angular/core';

export interface AppenderConfig {
  name: string;
  providerToken: OpaqueToken;
  logFormat: string;
  exceptionFormat: string;
}
