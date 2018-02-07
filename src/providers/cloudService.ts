import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalService } from "./localService";
import { ConstantService } from "./constantService";
import { ENV } from '@app/env'

import { User, Task, TaskList, Notes, Attachments, Time, Expense, Material, NotesDebrief, TaskName } from './model/model';

@Injectable()
export class CloudService {

    constructor(private http: HttpClient, private localService: LocalService, private constantService: ConstantService) {

        console.log('CloudService Provider');
    }

    getTaskList(isLogin) {

        var data = {};

        if (isLogin == "0" || this.constantService.lastUpdated == undefined || this.constantService.lastUpdated == null) {

            data = {
                "isLogin": isLogin,
                "resourceId": this.constantService.currentUser.ID,
                "fromDate": this.constantService.startDate,
                "toDate": this.constantService.endDate,
                "updateDate": ""
            };

        } else if (isLogin == "1") {

            data = {
                "isLogin": isLogin,
                "resourceId": this.constantService.currentUser.ID,
                "fromDate": this.constantService.startDate,
                "toDate": this.constantService.endDate,
                "updateDate": new Date(this.constantService.currentUser.Last_Updated_Task).toISOString()
            };
        }

        console.log("REQUEST TASK INTERNAL", data);

        console.log("START TASK INTERNAL", new Date());

        let user: User = new User();
        user.ID = this.constantService.currentUser.ID
        user.Last_Updated_Task = new Date() + "";

        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append("Content-Type", 'application/json');
            headers = headers.append("Authorization", ENV.authKey);
            headers = headers.append("oracle-mobile-backend-id", ENV.taskListBackEndId);

            this.http
                .post<any>(ENV.apiUrl + 'getTaskList/get_list', data, { headers: headers })
                .subscribe(response => {
              
                    console.log("GET TASK RESPONSE", response);

                    let taskList: Task[] = [];

                    let internalList: Task[] = [];

                    let taskInternalList: Task[] = [];

                    response.getTaskList.forEach(item => {

                        if (item.TaskDetails && item.TaskDetails.length > 0) {

                            item.TaskDetails.forEach(taskObject => {

                                taskObject.Type = "CUSTOMER";

                                taskObject.email = "";

                                taskObject.Date = new Date();

                                taskList.push(taskObject);
                            });
                        }

                        if (item.activities && item.activities.length > 0) {

                            item.activities.forEach(internalObject => {

                                internalList.push(internalObject);
                            });
                        }
                    });

                    this.localService.insertTaskList(taskList).then(resultTask => {

                        this.localService.insertInternalList(internalList).then(resultInternal => {

                            this.localService.getTaskList().then((response: Task[]) => {

                                this.localService.getInternalList().then(internalresponse => {

                                    internalresponse.forEach(item => {

                                        var internalObject: Task = new Task();

                                        internalObject.Start_Date = item.Start_time;
                                        internalObject.End_Date = item.End_time;
                                        internalObject.Type = "INTERNAL";
                                        internalObject.Customer_Name = item.Activity_type;
                                        internalObject.Task_Number = item.Activity_Id;

                                        response.push(internalObject);
                                    });

                                    this.constantService.currentTaskList = response;

                                    console.log("END TASK INTERNAL", new Date());

                                    this.localService.updateLastTask(user);

                                    resolve(response);

                                });
                            });
                        });
                    });

                }, (error: HttpErrorResponse) => {

                    console.log("GET TASK ERROR", error);

                    reject(error);
                });
        });
    }

    private handleError(error: any): Promise<any> {

        console.error('An error occurred', error);

        return Promise.reject(error.message || error);
    }

    // register(data) {

    //     return new Promise((resolve, reject) => {

    //         let headers = new HttpHeaders();

    //         headers.append('Content-Type', 'application/json');

    //         this.http.post(apiUrl + 'guest/signup', JSON.stringify(data), { headers: headers })
    //             .subscribe(res => {
    //                 resolve(res);
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }


    // let headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': ENV.authKey,
    //     'oracle-mobile-backend-id': ENV.techBackEndId
    // });

    // logout() {

    //     return new Promise((resolve, reject) => {

    //         let headers = new HttpHeaders();

    //         headers.append('X-Auth-Token', localStorage.getItem('token'));

    //         this.http.post(apiUrl + 'logout', {}, { headers: headers })
    //             .subscribe(res => {
    //                 localStorage.clear();
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }
}