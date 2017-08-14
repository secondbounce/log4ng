import { OpaqueToken } from '@angular/core';

export interface AppenderConfig {
  name: string;
  providerToken: OpaqueToken;
  layoutPattern: string;
}
