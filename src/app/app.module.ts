import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { GraphPaneComponent } from './graphPane/graphPane.component';
import { TopPaneComponent } from './topPane/topPane.component';
import { DbComponent } from './database/db.component';
//import { ChartModule } from 'angular2-chartjs';
import { ChartsModule } from 'ng2-charts';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { FormsModule} from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    GraphPaneComponent,
    TopPaneComponent,
    DbComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    ChartsModule,
    HttpModule,
    FormsModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
