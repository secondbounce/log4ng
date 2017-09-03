import { NgModule } from '@angular/core';

import { ConsoleService } from './console.service';
import { LogService } from './log.service';

@NgModule({
  declarations: [],
  providers: [
    ConsoleService,
    LogService
  ],
  exports: []
})
export class Log4ngModule { }
