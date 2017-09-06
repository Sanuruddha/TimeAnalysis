
import { Component, ViewChild } from '@angular/core';
import {AngularIndexedDB} from 'angular2-indexeddb';
import { DbService } from './db.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../app.messageservice';
import { Queries } from './queries';
import { ModalDirective } from 'ngx-bootstrap';
//import { GraphPaneComponent } from '../graphPane/graphPane.component';

@Component({
  selector: 'db',
  templateUrl:'./db.component.html',
    providers: [DbService]
 
})

export class DbComponent {
  @ViewChild('bootstrapModal') public bootstrapModal:ModalDirective;
  
  public maximumParameters = 5;
  private data = {}; //reads the file using the service
  private options = {}; //consist of parameters and available options for each parameter in all the files read
  private labels = []; //generates the drop downs dynamically
  private timingMethods = []; //test-time values for drop down hard-coded
  private optionKeyMapping; //takes the form of {option1: "device", option2: "os"} 
  query: Queries;
  db;
  private msg = {};
  private messageService;
  
  constructor(private _dbService: DbService, messageService: MessageService){
    this._dbService.getData()
    .subscribe(resDbData => {this.data = resDbData; this.initializeDropDowns()});
    this.messageService = messageService;
    this.databaseInitialization(); 

  }
  initializeDropDowns(){
    this.createOptionsStructure(); // this should be called before mapOptionsToKeys
    this.mapOptionsToKeys(); //this should be called before adding data to the object store
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
    this.optionKeyMapping["values"] =  "option" + i;
    i++;
    for (let key in this.options){
      this.optionKeyMapping[key] = "option" + i;
      i++;
    }
    
  }

  createOptionsStructure(){
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
    this.initializeDropDowns();
    this.readAndAddFile(this.data);

  }

  
  readAndAddFile(fileContent: {}){
    let objectToBestored = {};
    for (let key in fileContent){
      let instanceKey = this.optionKeyMapping[key];
      objectToBestored[instanceKey] = fileContent[key];
    }
    //add data to the database
    this.db.add('TestObjectStore', objectToBestored).then(() => {
      console.log('fields added');
       }, (error) => {
        console.log('error is'+error);
    });
    
  }

  sendToGenerateGraph(graphParametersForm: NgForm){
    this.msg = {};
    this.msg["legendInfo"] = graphParametersForm.value;
    let transformedFields = this.transformForQuerying(graphParametersForm.value);
    console.log(transformedFields);
    this.query = new Queries();
    let yAxis = this.query.getByFields(this.db, transformedFields, this.sendMessage, this);
  
  }

  transformForQuerying(jsonObj){
    var transform= {};
      for (let key in jsonObj){
        transform[this.optionKeyMapping[key]] = jsonObj[key];
      }
      return transform;
  }

  sendMessage(yAxis: any,dbcomp : DbComponent ){
    if (yAxis){
      console.log(yAxis);
      dbcomp.msg["yAxis"] = yAxis;
      dbcomp.messageService.sendMessage(dbcomp.msg);
      
      
    }
    else{
      return
    }
    
  }
  clearMessage(): void {
    // clear message
    this.messageService.clearMessage();
  }

  
  showModal(){
    this.bootstrapModal.show();
  }

  closeModal(){
      this.bootstrapModal.hide();
  }

}
