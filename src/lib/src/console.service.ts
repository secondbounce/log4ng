import { Injectable } from '@angular/core';

/**
 * Simple wrapper class around standard `console` class provided to support mocking for tests.
 */
@Injectable()
export class ConsoleService {
  /* We're only exposing those functions that are actually being used by the ConsoleAppender */

/* tslint:disable: no-console */
  // public assert(value: any, message?: string, ...optionalParams: any[]): void {
  //   console.assert(value, message, optionalParams);
  // }

  public debug(message?: string, ...optionalParams: any[]): void {
    console.debug(message, optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    console.error(message, optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    console.info(message, optionalParams);
  }

  public log(message?: any, ...optionalParams: any[]): void {
    console.log(message, optionalParams);
  }

  // public time(label: string): void {
  //   console.time(label);
  // }

  // public timeEnd(label: string): void {
  //   console.timeEnd(label);
  // }

  public trace(message?: any, ...optionalParams: any[]): void {
    console.trace(message, optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, optionalParams);
  }
/* tslint:enable: no-console */
}
