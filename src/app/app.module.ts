import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { GraphPaneComponent } from './graphPane/graphPane.component';
import { TopPaneComponent } from './topPane/topPane.component';
import { DbComponent } from './database/db.component';
import { ChartsModule } from 'ng2-charts';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { FormsModule} from '@angular/forms';
import { MessageService } from './app.messageservice';
import { ModalModule } from 'ngx-modal';






@NgModule({
  declarations: [
    AppComponent,
    DbComponent,
    GraphPaneComponent
   
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    ChartsModule,
    HttpModule,
    FormsModule,
    ModalModule
  ],
  exports:[],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
