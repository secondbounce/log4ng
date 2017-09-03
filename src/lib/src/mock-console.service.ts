import { Injectable } from '@angular/core';

import { ConsoleService } from './console.service';

/**
 * Simple wrapper class around standard `console` class provided to support mocking for tests.
 */
@Injectable()
export class MockConsoleService extends ConsoleService {
  public static lastOutput: string = null;

  /* We're only mocking those functions that are actually being used by the ConsoleAppender */
  public trace(message: string): void {
    MockConsoleService.lastOutput = message;
  }

  public debug(message: string): void {
    MockConsoleService.lastOutput = message;
  }

  public info(message: string): void {
    MockConsoleService.lastOutput = message;
  }

  public warn(message: string): void {
    MockConsoleService.lastOutput = message;
  }

  public error(message: string): void {
    MockConsoleService.lastOutput = message;
  }
}
