import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Log4ngxModule } from 'log4ngxg';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    Log4ngxModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
