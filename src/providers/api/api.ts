import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Notes, Attachments, Time, Expense, Material, NotesDebrief, TaskName } from '../model/model';
import * as moment from 'moment';
/*
Generated class for the ApiProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class ApiProvider {
  timeArrayres;
  projectDetails;
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
    return this.http.get("assets/json/taskListCloudRes.json")
    //.map((res: Response) => res.json())
    .catch(
      this.handleError
    );
  }
  
  getTechnicianProfile(){
    this.http.get('assets/json/technicianProfile.json').subscribe(data => {
      console.log(data);
    });
  }
  
  getNotes(): Observable<Notes[]>{
    return this.http.get('assets/json/notes.json')
    //.map((res: Response) => res.json())
    .catch((error: any) => Observable.throw( 'Server error'));
  }
  
  getContacts(){
    this.http.get('assets/json/contacts.json').subscribe(data => {
      console.log(data);
    });
  }
  getCalendarData(date):Promise<any[]>
  {
    return this.http
    .get('assets/json/calendarData.json')
    .toPromise()
    .then(function(res)
    {
      let op = [];
      if(date){
        res.filter(function(o){
          if(moment(o.Start_Date).format("DD/MM/YYYY") === date.format("DD/MM/YYYY")){
            op.push(o);
          }
        });
        return op;
      }
      return res;
    }.bind(this))
    .catch(this.handleError);
  
  }

  getInstallBase(): Observable<any[]>{
    //return   this.http.get('../assets/json/installBaseCloud.json')
    return this.http.get("assets/json/installBaseCloud.json")
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
    .get('assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let timeArray:Time[]=[];
      this.timeArrayres= res;
      this.timeArrayres.timeArray.forEach(function(timeobject)
      {
        let time:Time;
        time= new Time(timeobject);
        timeArray.push(time);
      })
      
      return timeArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getExpenseArray():Promise<Expense[]>
  {
    
    return this.http
    .get('assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let expenseArray:Expense[]=[];
      this.timeArrayres= res;
      this.timeArrayres.expenseArray.forEach(function(expenseobject)
      {
        let expense:Expense;
        expense= new Expense(expenseobject);
        expenseArray.push(expense);
      })
      
      return expenseArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getMaterialArray():Promise<Material[]>
  {
    
    return this.http
    .get('assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let materialArray:Material[]=[];
      this.timeArrayres= res;
      this.timeArrayres.materialArray.forEach(function( materialobject)
      {
        let  material:Material;
        material= new Material(materialobject);
        materialArray.push( material);
      })
      
      return  materialArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getNotesArray():Promise<NotesDebrief[]>
  {
    
    return this.http
    .get('assets/json/debrief.json')
    .toPromise()
    .then(function(res)
    {
      let noteArray:NotesDebrief[]=[];
      this.timeArrayres= res;
      this.timeArrayres.notesArray.forEach(function(noteobject)
      {
        let note:NotesDebrief;
        note= new NotesDebrief(noteobject);
        noteArray.push(note);
      })
      
      return noteArray || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getLOVDetails():Promise<any[]>
  {
    
    return this.http
    .get('assets/json/lovDetails.json')
    .toPromise()
    .then(function(res)
    {
      
      // this.projectDetails.getProjectDetails[2].TaskName.forEach(function(jobnameobject)
      // {
      //   let job:TaskName;
      //   job= new TaskName(jobnameobject);
      //   taskNames.push(job);
      // })
      
      return res || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  getProjectDetails():Promise<any[]>
  {
    
    return this.http
    .get('assets/json/projectDetails.json')
    .toPromise()
    .then(function(res)
    {
      let taskNames:TaskName[]=[];
      this.projectDetails= res;
      // this.projectDetails.getProjectDetails[2].TaskName.forEach(function(jobnameobject)
      // {
      //   let job:TaskName;
      //   job= new TaskName(jobnameobject);
      //   taskNames.push(job);
      // })
      
      return this.projectDetails || [];
    }.bind(this))
    .catch(this.handleError);
  
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  
}

