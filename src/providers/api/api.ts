import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Notes, Attachments, Time } from '../model/model';
/*
Generated class for the ApiProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class ApiProvider {
  timeArrayres;
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }
  
  // getTaskDetails(){
  //   return this.http.get('../assets/json/taskListCloudRes.json')
  //    .subscribe(data => {
  //      console.log(data);
  //   });
  // }
  
  getTaskDetails(): Observable<any[]> {
    return this.http.get("../assets/json/taskListCloudRes.json")
    //.map((res: Response) => res.json())
    .catch((error: any) => Observable.throw( 'Server error'));
  }
  
  getTechnicianProfile(){
    this.http.get('../assets/json/technicianProfile.json').subscribe(data => {
      console.log(data);
    });
  }
  
  getNotes(): Observable<Notes[]>{
    return this.http.get('../assets/json/notes.json')
    //.map((res: Response) => res.json())
    .catch((error: any) => Observable.throw( 'Server error'));
  }
  
  getContacts(){
    this.http.get('../assets/json/contacts.json').subscribe(data => {
      console.log(data);
    });
  }
  
  getInstallBase(): Observable<any[]>{
    //return   this.http.get('../assets/json/installBaseCloud.json')
    return this.http.get("../assets/json/installBaseCloud.json")
    //.map((res: Response) => res.json())
    .catch((error: any) => Observable.throw( 'Server error'));
  }
  
  getShiftCode(){
    this.http.get('../assets/json/shiftCodeRes.json').subscribe(data => {
      console.log(data);
    });
  }
  
  getOvertimeShiftCode(){
    this.http.get('../assets/json/overTimeShiftCode.json').subscribe(data => {
      console.log(data);
    });
  }
  
  getFields(){
    this.http.get('../assets/json/getFields.json').subscribe(data => {
      console.log(data);
    });
  }
  getAttachments(): Observable<Attachments[]>{
    return this.http.get('../assets/json/attachment.json')
    //.map((res: Response) => res.json())
    .catch((error: any) => Observable.throw( 'Server error'));
  }
  
  getTimeArray():Promise<Time[]>
  {
    
    return this.http
    .get('../assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let timeArray:Time[]=[];
      this.timeArrayres= res;
      this.timeArrayres.TimeArray.forEach(function(timeobject)
      {
        let time:Time;
        time= new Time(timeobject);
        timeArray.push(time);
      })
      
      return timeArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getExpenseArray():Promise<Time[]>
  {
    
    return this.http
    .get('../assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let timeArray:Time[]=[];
      this.timeArrayres= res;
      this.timeArrayres.TimeArray.forEach(function(timeobject)
      {
        let time:Time;
        time= new Time(timeobject);
        timeArray.push(time);
      })
      
      return timeArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getMaterialArray():Promise<Time[]>
  {
    
    return this.http
    .get('../assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let timeArray:Time[]=[];
      this.timeArrayres= res;
      this.timeArrayres.TimeArray.forEach(function(timeobject)
      {
        let time:Time;
        time= new Time(timeobject);
        timeArray.push(time);
      })
      
      return timeArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getNotesArray():Promise<Time[]>
  {
    
    return this.http
    .get('../assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let timeArray:Time[]=[];
      this.timeArrayres= res;
      this.timeArrayres.TimeArray.forEach(function(timeobject)
      {
        let time:Time;
        time= new Time(timeobject);
        timeArray.push(time);
      })
      
      return timeArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

