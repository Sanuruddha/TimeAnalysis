import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { GraphPaneComponent } from './graphPane/graphPane.component';
import { TopPaneComponent } from './topPane/topPane.component';
import { SidePaneComponent } from './sidePane/sidePane.component';
import { DbComponent } from './database/db.component';
import { ChartModule } from 'angular2-chartjs';
import { AngularIndexedDB } from 'angular2-indexeddb';





@NgModule({
  declarations: [
    AppComponent,
    GraphPaneComponent,
    TopPaneComponent,
    SidePaneComponent,
    DbComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    ChartModule,
    HttpModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
