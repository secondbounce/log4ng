import { Component } from '@angular/core';
import { LogService } from '@log4ng/log4ng';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(logService: LogService) {
// TODO: exercise the log service
  }
}