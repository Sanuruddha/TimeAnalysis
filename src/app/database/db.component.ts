import { Component } from '@angular/core';
import {AngularIndexedDB} from 'angular2-indexeddb';
import { DbService } from './db.service';

@Component({
  selector: 'db',
  templateUrl:'./db.component.html',
    providers: [DbService]
 
})

export class DbComponent {
   data = [];

   constructor(private _dbService: DbService){}

  ngOnInit() {
    let db = new AngularIndexedDB('mydb', 1);
    db.createStore(1, (evt) => {
        let objectStore = evt.currentTarget.result.createObjectStore(
          'Userdetails', { keyPath: "id", autoIncrement: true });
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("email", "email", { unique: true });

    }).then(() => {
    db.add('Userdetails', { name: 'name', email: 'name@mail.com' }).then(() => {
      // Do something after the value was added
      console.log('fields added');
        }, (error) => {
      console.log('error is'+error);
    });
    }).then(()=>{
      db.getByKey('Userdetails', 1).then((person) => {
        console.log(person);
    }, (error) => {
        console.log(error);
    
    });
    });

    this._dbService.getData()
        .subscribe(resDbData => this.data = resDbData);
    }
    
  
}