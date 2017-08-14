import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Log4ngModule } from '@log4ng/log4ng';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    Log4ngModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
