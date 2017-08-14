import { Component } from '@angular/core';
import { Log4ngModule } from '@log4ng/log4ng';

@Component({
  selector: 'integration-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(logService: LogService) {
// TODO: exercise the log service
  }
}
