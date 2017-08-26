import {AngularIndexedDB} from 'angular2-indexeddb';

export class Queries{

    getByFields(db: any, fields: any){
        console.log("methanata awa");
        db.openCursor('TestObjectStore', (evt) => {
        var cursor = evt.target.result;
        if(cursor) {
            if ((cursor.value.option1 == fields["option1"]) && (cursor.value.option2 == fields["option2"]) && cursor.value.option3 == fields["option3"]){
                console.log("succesful search");
                console.log(cursor.value.option4);
                return
            }
            else{
            cursor.continue();
            }
        } 
        else {
            alert("no such combination");
            console.log("no such combination");
        }
    });

    }


}