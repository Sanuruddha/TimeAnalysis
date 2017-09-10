import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
// import { GraphPaneComponent } from './graphPane/graphPane.component';
import { TopPaneComponent } from './topPane/topPane.component';
import { DbComponent } from './database/db.component';
import { ChartsModule } from 'ng2-charts';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { FormsModule} from '@angular/forms';
import { MessageService } from './app.messageservice';
import { ModalModule } from 'ngx-modal';
import { ChartModule } from 'angular2-highcharts';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import { ChartHCComponent } from './hc/hc.component';
var Highcharts = require('highcharts'),
HighchartsCustomEvents = require('highcharts-custom-events')(Highcharts);


declare var require : any;
export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  // const HighchartsCustomEvents = require('highcharts-custom-events');
  dd(hc);
  // dd(HighchartsCustomEvents);
  return hc;
  }



@NgModule({
  declarations: [
    AppComponent,
    DbComponent,
    // GraphPaneComponent
    ChartHCComponent
   
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    ChartsModule,
    HttpModule,
    FormsModule,
    ModalModule,
    ChartModule
  ],
  exports:[],
  providers: [MessageService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);