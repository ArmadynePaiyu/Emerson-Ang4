import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { LocalService } from "./localService";
import { ConstantService } from "./constantService";

import { ENV } from '@app/env'

import { User, Notes, Attachments, Time, Expense, Material, NotesDebrief, TaskName } from './model/model';

@Injectable()
export class CloudService {

    constructor(private platform: Platform, private http: HttpClient, private localService: LocalService, private constantService: ConstantService) {

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
                "updateDate": this.constantService.lastUpdated.toISOString()
            };
        }

        console.log("REQUEST TASK", data);

        console.log("START TASK", new Date());

        var userObject = {
            'ID': this.constantService.currentUser.ID,
            'Last_Updated_Task': new Date()
        };

        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append("Content-Type", 'application/json');
            headers = headers.append("Authorization", ENV.authKey);
            headers = headers.append("oracle-mobile-backend-id", ENV.taskListBackEndId);

            this.http
                .post(ENV.apiUrl + 'getTaskList/get_list', data, { headers: headers })
                .subscribe(response => {

                    console.log("GET TASK RESPONSE", response);

                    resolve(response);

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