import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class DbService{
    private _url: string = "../assets/testData.json";

    constructor(private _http: Http){}

    //getting the test data in the json files stroed in assets folder and is fed to the IndexedDB
    getData(){
        return this._http.get(this._url).map((response: Response) => response.json()); 
    }
}