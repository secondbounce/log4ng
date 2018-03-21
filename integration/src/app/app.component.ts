import { Component } from '@angular/core';
import { Log4ngxModule } from 'log4ngx';

@Component({
  selector: 'integration-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(logService: LogService) {
// TODO: exercise the log service
  }
}
