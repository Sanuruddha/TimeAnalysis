import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { TopPane } from './topPane/topPane.component';
import { GraphPane } from './graphPane/graphPane.component';
import { SidePane } from './sidePane/sidePane.component';



@NgModule({
  declarations: [
    AppComponent,
    TopPane,
    GraphPane,
    SidePane
  ],
  imports: [
    ChartModule,
    BrowserModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
