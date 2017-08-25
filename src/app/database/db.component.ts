import { Component } from '@angular/core';
import {AngularIndexedDB} from 'angular2-indexeddb';
import { DbService } from './db.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../app.messageservice';
import { Queries } from './queries';

@Component({
  selector: 'db',
  templateUrl:'./db.component.html',
    providers: [DbService, MessageService]
 
})

export class DbComponent {
  public maximumParameters = 5;
  private data = {}; //reads the file using the service
  private options = {}; //consist of parameters and available options for each parameter in all the files read
  private labels = []; //generates the drop downs dynamically
  private timingMethods = []; //values ddrop down hard-coded
  private optionKeyMapping;
  query: Queries;
  db;
  
  constructor(private _dbService: DbService, private messageService: MessageService){
    this._dbService.getData()
      .subscribe(resDbData => this.data = resDbData);
      

    this.databaseInitialization(); 
    this.createOptionsStructure(); // this should be called before mapOptionsToKeys
    this.mapOptionsToKeys(); //this should be called before adding data to the object store
    console.log(this.optionKeyMapping);
    
    
  }

  databaseInitialization(){
    this.db = new AngularIndexedDB('Trial',5);
    
    this.db.createStore(4, (evt) => {
      let objectStore = evt.currentTarget.result.createObjectStore(
        'TestObjectStore', { keyPath: "id", autoIncrement: true });
        for (var i=1; i<=this.maximumParameters; i++)
      objectStore.createIndex("option"+i, "option"+i, { unique: false });
    
     });
  }

  mapOptionsToKeys(){
    this.optionKeyMapping = {};
    let i = 1;
    for (let key in this.options){
      this.optionKeyMapping[key] = "option" + i;
      i++;
    }
    this.optionKeyMapping["values"] =  "option" + i;
  }

  createOptionsStructure(){
    alert();
    for (var prop in this.data) {
      if (prop != "values"){
          if (!this.options.hasOwnProperty(prop)){
            var array = []
            array.push(this.data[prop]);
            this.options[prop] = array;
          }
          else{
            if (this.options[prop].indexOf(this.data[prop]) < 0){
              this.options[prop].push(this.data[prop]);
            }
          }
        }
        else{
          this.timingDropDown();
        }
      }
    this.labels = Object.keys(this.options); 
    
  }

  timingDropDown(){
    var index = [];
    index =  Object.keys(this.data["values"][0]);
    var num = index.indexOf('id');
    index.splice(num, 1);
    console.log(index);
    for (var i=0; i < index.length; i++){
      if (this.timingMethods.indexOf(index[i]) < 0){
        this.timingMethods.push(index[i]);
      }
    }
  }
 
 

  loadFiles(){
    this.db.clear('TestObjectStore');
    this.mapOptionsToKeys();
    this.readAndAddFile(this.data);
  }

  
  readAndAddFile(fileContent: {}){
    let objectToBestored = {};
    for (let key in fileContent){
      let instanceKey = this.optionKeyMapping[key];
      objectToBestored[instanceKey] = fileContent[key];
    }
    console.log(objectToBestored);
    console.log(this.data);

    //add data to the database
    this.db.add('TestObjectStore', objectToBestored).then(() => {
      console.log('fields added');
       }, (error) => {
        console.log('error is'+error);
    });
    
  }

  sendToGenerateGraph(graphParametersForm: NgForm){
      console.log(graphParametersForm.value);
      let transformedFields = this.transformForQuerying(graphParametersForm.value);
      console.log(transformedFields);
      this.query = new Queries();
      this.query.getByFields(this.db, transformedFields);
  }

  transformForQuerying(jsonObj){
    var transform= {};
      for (let key in jsonObj){
        transform[this.optionKeyMapping[key]] = jsonObj[key];
      }
      return transform;
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage('Message from Home Component to App Component!');
}

clearMessage(): void {
    // clear message
    this.messageService.clearMessage();
}
    
    //   this.db.getByKey('TestObjectStore', 1).then((person) => {
    //     console.log(person);
    // }, (error) => {
    //     console.log(error);
    
    // });
    
  //   var gold = ["TC700H", "Postal_1 Poster Camara Stress"];
  //   this.db.openCursor('TestObjectStore', (evt) => {
  //     var cursor = evt.target.result;
  //     if(cursor) {
  //       if ((cursor.value.device == gold[0]) && (cursor.value.test == gold[1]) ){
  //         console.log(cursor.value.values);
  //         return
  //       }
  //       else{
  //         cursor.continue();
  //       }
  //   } else {
  //       console.log('Entries all displayed.');
  //   }
  // });

  //   this.db.getByIndex('TestObjectStore', ["device", "test" ], ["TC700H", "Postal_1 Poster Camara Stress"]).then((person) => {
  //     console.log("works");
  // }, (error) => {
  //     console.log(error);
  
  // });
  



}