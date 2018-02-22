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

    constructor(public navController: NavController, public navParams: NavParams, public apiService: ApiProvider, private valueService: ValueService, public storage: Storage, private constantService: ConstantService) {

        this.tasklists = this.constantService.currentTaskList;
    };

    ionViewDidLoad() {
        this.apiService.getTaskDetails().subscribe(data => {
            this.users = data;
            console.log(this.users);
          this.tasklists = this.users.TaskDetails;
          

        })
    };

    doRefresh(refresher) {

        // this.cloudService.getTaskList(isLogin).then(response => {

        //     this.loading.dismissAll();

        //     // this.navController.setRoot(TasklistPage);

        //   }, error => {

        //   });

        console.log('Begin async operation', refresher);

        this.apiService.getTaskDetails().subscribe(data => {
            this.users = data;
            console.log(this.users);
            // this.tasklists = this.users.TaskDetails;
            setTimeout(() => {
                console.log('Async operation has ended');
                refresher.complete();
            }, 3000);

        })

    }

    goToDebrief(task) {

        this.navController.push(TimePage);
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
        this.navController.push(FieldjobPage, { "task": task });

    }

}
