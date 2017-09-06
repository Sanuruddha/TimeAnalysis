import {AngularIndexedDB} from 'angular2-indexeddb';

export class Queries{

    getByFields(db: any, fields: any, callback, dbcomp){
        
        fields = this.deleteByVal(fields);
      
        db.openCursor('TestObjectStore', (evt) => {
        var cursor = evt.target.result;
        if(cursor) {
            let count = Object.keys(fields).length;
            let available = false;
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
                let yAxis = this.extractByValue(cursor.value.option1,fields.option1);
                callback(yAxis, dbcomp);
            }
            else{
                cursor.continue();
            }
        } 
        else {
            alert("no such combination");
            return;
     }
    });

    }

    //convert fileds where optionX:None to optionX:undefined"
    deleteByVal(obj: any) {
        for (var key in obj) {
            if (obj[key] == "None") 
                obj[key] = undefined;
        }
        return(obj);
    }
    
    extractByValue(valueSet: any[], testValue){
        let count = valueSet.length;
        let yAxis = [];
        for (let i=0; i<count; i++){
            yAxis.push(valueSet[i][testValue]);
        }

        return yAxis;
    }

}