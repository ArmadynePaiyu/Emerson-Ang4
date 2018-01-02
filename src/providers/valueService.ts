import { TaskDetail } from "./model/model";

export class ValueService
{
    futureTask;
    setIfFutureDateTask(value:any):void
    {
        this.futureTask = value;
    }
    getIfFutureDateTask():any {
        return this.futureTask;
    };
    checkIfFutureDayTask(selTask:TaskDetail):boolean {
        
        var currDate = new Date;
        
        var selDate = new Date(selTask.Start_Date.split(" ")[0]);
        
        // console.log(currDate);
        //
        // console.log(selDate);
        
        if (selDate.getFullYear() > currDate.getFullYear()) {
            
            return true;
            
        } else if (selDate.getFullYear() === currDate.getFullYear()) {
            
            if (selDate.getMonth() > currDate.getMonth()) {
                
                return true;
                
            } else if (selDate.getMonth() === currDate.getMonth()) {
                
                if (selDate.getDate() > currDate.getDate()) {
                    
                    return true;
                }
            }
        }
        
        return false;
    };
     setTask(taskObject:TaskDetail, callback:any) {
        callback("success")
    }
}