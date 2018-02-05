import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { User, TaskDetails, TaskDetail, GlobalSharedService } from '../../providers/model/model';
import { FieldjobPage } from '../fieldjob/fieldjob';
import { ApiProvider } from '../../providers/api/api';
import { ValueService } from '../../providers/valueService';
import { LocalService } from "../../providers/localService";
import { AuthService } from "../../providers/authService";
import { ConstantService } from "../../providers/constantService";
import { CloudService } from '../../providers/cloudService';

import { TimePage } from '../time/time';
@IonicPage()
@Component({
    selector: 'page-tasklist',
    templateUrl: 'tasklist.html',
})
export class TasklistPage {
    tasklists: any;
    users: any;
    selectedTask: TaskDetail;

    constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiProvider, private valueService: ValueService, public storage: Storage) {
        // this.localService.getDatabaseState().subscribe(ready => {
        //     if (ready) {
        //         // this.getTaskList();
        //     }
        // });

        // this.apiService.getTaskDetails().subscribe(data => {
        //     this.users = data;
        //     console.log(this.users);
        //     this.tasklists = this.users.TaskDetails;
        // });

        // console.log("START LOGIN ");

        // let baseData = "vaibhav.jain:Emerson123";

        // let authorizationValue: string = window.btoa(baseData);

        // this.user.encrypt = authorizationValue;
        // this.user.userName = "vaibhav.jain";

        // this.authService.login(this.user).then(response => {

        //     console.log("LOGIN SUCCESS", response);

        //     this.localService.getDatabaseState().subscribe(ready => {

        //         if (ready) {

        //             this.localService.getUserList().then(response => {

        //                 if (response.length > 0) {

        //                     response.forEach((item: User) => {

        //                         if (item.Login_Status == "1") {

        //                             this.constantService.currentUser = item;

        //                             this.constantService.lastUpdated = new Date(this.constantService.currentUser.Last_Updated);
        //                         }
        //                     });

        //                     this.getTaskList();
        //                 }
        //             }, error => {

        //                 console.error("GET USER DB ERROR", error)
        //             });
        //         }
        //     });
        // });


        this.apiService.getTaskDetails().subscribe(data => {
            this.users = data;
            console.log(this.users);
            this.tasklists = this.users.TaskDetails;
        })
    }

    ionViewDidLoad() {
    }
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.apiService.getTaskDetails().subscribe(data => {
            this.users = data;
            console.log(this.users);
            this.tasklists = this.users.TaskDetails;
            setTimeout(() => {
                console.log('Async operation has ended');
                refresher.complete();
            }, 3000);

        })

    }
    goToDebrief(task) {
        this.navCtrl.push(TimePage);
        this.storage.set('task', task);
    }
    onclickOfTask(task) {
        console.log("TASK " + JSON.stringify(task));

        this.selectedTask = task;
        this.storage.set('task', task);
        var self = this;

        this.valueService.setTask(task, function (response) {

            GlobalSharedService.completedTask = false;

            this.notFutureDate = this.valueService.checkIfFutureDayTask(task);

            this.valueService.setIfFutureDateTask(this.notFutureDate);

            switch (task.Task_Status) {

                case 'Field Job Completed':

                    //$rootScope.showDebrief = true;
                    //$rootScope.showTaskDetail = true;

                    this.showStartWork = false;
                    this.showDebriefBtn = true;
                    GlobalSharedService.showWorkingBtn = false;
                    GlobalSharedService.showAccept = false;
                    GlobalSharedService.completedTask = true;

                    break;

                case 'Completed':

                    //$rootScope.showDebrief = true;
                    //$rootScope.showTaskDetail = true;

                    this.showStartWork = false;
                    this.showDebriefBtn = true;
                    GlobalSharedService.completedTask = true;
                    GlobalSharedService.showAccept = false;
                    GlobalSharedService.showWorkingBtn = false;
                    break;

                case 'Assigned':

                    //$rootScope.showDebrief = false;
                    // $rootScope.showTaskDetail = true;

                    this.showStartWork = true;
                    GlobalSharedService.showAccept = true;
                    this.showDebriefBtn = false;
                    GlobalSharedService.showWorkingBtn = false;
                    break;

                case 'Accepted':

                    //$rootScope.showDebrief = true;
                    //$rootScope.showTaskDetail = true;

                    this.showStartWork = true;
                    this.showDebriefBtn = false;
                    GlobalSharedService.showAccept = false;
                    GlobalSharedService.showWorkingBtn = true;
                    break;
                case 'Working':

                    //$rootScope.showDebrief = true;
                    //$rootScope.showTaskDetail = true;

                    this.showStartWork = true;
                    this.showDebriefBtn = true;
                    GlobalSharedService.showAccept = false;
                    GlobalSharedService.showWorkingBtn = false;
                    break;

                default:
                    break;
            }
        }.bind(this));
        this.navCtrl.push(FieldjobPage, { "task": task });

    }

}
