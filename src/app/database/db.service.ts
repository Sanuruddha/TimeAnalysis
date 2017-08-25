import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class DbService{
    private subject = new Subject<any>();
 
    private _url1: string = "../assets/testFiles/testData.json";
    private _url2: string = "../assets/testFiles/secondFile.json";

    constructor(private _http: Http){}

    //getting the test data in the json files stroed in assets folder and is fed to the IndexedDB
    getData(){
        return this._http.get(this._url1).map((response: Response) => response.json()); 
    }

    readFiles(){
        return this._http.get(this._url2).map((response: Response) => response.json()); 
    }
}