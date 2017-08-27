import {AngularIndexedDB} from 'angular2-indexeddb';

export class Queries{

    getByFields(db: any, fields: any){
        console.log("methanata awa");
        fields = this.deleteByVal(fields);
        console.log("critical");
        console.log(fields);
        db.openCursor('TestObjectStore', (evt) => {
        var cursor = evt.target.result;
        if(cursor) {
            let count = Object.keys(fields).length;
            let available = true;
            let i=2;
            while((i<= count)){
                if (cursor.value["option"+i] == fields["option"+i]){
                    available = true;
                    i++;
                }
                else{
                    available = false;  
                    break;
                }
            }
            if (available == true && (i==count+1)){
                console.log("succesful search");
                console.log(cursor.value.option1);
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

    deleteByVal(obj: any) {
        for (var key in obj) {
            if (obj[key] == "None") 
                delete obj[key];
        }
        return(obj);
    }
    
    


}