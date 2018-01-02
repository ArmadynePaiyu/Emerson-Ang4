import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

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

  getNotes(){
    this.http.get('../assets/json/notes.json').subscribe(data => {
      console.log(data);
    });
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
}
