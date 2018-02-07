import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskDetail, InstallBase, GlobalSharedService } from '../../providers/model/model';
import { ApiProvider } from '../../providers/api/api';
import { OnsiteRequirementPage } from '../onsite-requirement/onsite-requirement';
import { TimePage } from '../time/time';
import { TasklistPage } from '../tasklist/tasklist';


/**
* Generated class for the FieldjobPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-fieldjob',
  templateUrl: 'fieldjob.html',
})
export class FieldjobPage {
  taskDetails:TaskDetail;
  installBase;
  showAccept;
  showWorkingBtn;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider) {
    this.taskDetails = this.navParams.get("task");
    this.taskDetails.InstallBase=[];
    this.showAccept=GlobalSharedService.showAccept;
    this.showWorkingBtn=GlobalSharedService.showWorkingBtn;
  }
  
  ionViewDidLoad() {
    this.apiService.getInstallBase().subscribe(data =>{
      
      this.installBase = data;
      this.installBase.InstallBase.forEach(function(eachObj)
      {
        if(eachObj.Task_Number== this.taskDetails.Task_Number)
        {
          this.taskDetails.InstallBase.push(eachObj);
        }
      },this)
      
    });
    
  }
  gotoTaskList()
  {
    this.navCtrl.push(TasklistPage);
  }
  goToDebrief(){
    this.navCtrl.push(TimePage);
  }
  goToBack():void
  {
    // if (valueService.getUserType().defaultView == "My Task") {
    
    //   $state.go("myFieldJob");
    //   $rootScope.selectedItem = 2;
    //   $rootScope.showTaskDetail = false;
    
    // } else {
    
    //   $state.go("myTask");
    //   $rootScope.selectedItem = 1;
    //   $rootScope.showTaskDetail = false;
    // }
  }
  accept():void
  {
    // console.log("STATUS " + $scope.selectedTask.Task_Status);
    
    if (this.taskDetails.Task_Status == 'Assigned') {
      this.goToOnsiteReq();
      //   if (valueService.getNetworkStatus()) {
      
      //     $rootScope.dbCall = true;
      
      //     valueService.acceptTask(valueService.getTask(), function (result) {
      
      //       $rootScope.showAccept = false;
      
      //       $rootScope.showWorkingBtn = true;
      
      //       $rootScope.dbCall = false;
      //       $scope.selectedTask.Task_Status = "Accepted";
      //       cloudService.getTaskInternalList("0", function (response) {
      
      //         $state.go($state.current, {}, { reload: true });
      //         $scope.selectedTask.Task_Status = "Accepted";
      //       });
      //     });
      
      //   } else {
      
      //     var taskObject = {
      //       Task_Status: "Accepted",
      //       Task_Number: valueService.getTask().Task_Number,
      //       Submit_Status: "A",
      //       Date: new Date()
      //     };
      
      //     localService.updateTaskSubmitStatus(taskObject, function (result) {
      
      //       localService.getTaskList(function (response) {
      
      //         localService.getInternalList(function (internalresponse) {
      
      //           angular.forEach(internalresponse, function (item) {
      
      //             var internalOFSCJSONObject = {};
      
      //             internalOFSCJSONObject.Start_Date = item.Start_time;
      //             internalOFSCJSONObject.End_Date = item.End_time;
      //             internalOFSCJSONObject.Type = "INTERNAL";
      //             internalOFSCJSONObject.Customer_Name = item.Activity_type;
      //             internalOFSCJSONObject.Task_Number = item.Activity_Id;
      
      //             response.push(internalOFSCJSONObject);
      //           });
      
      //           constantService.setTaskList(response);
      
      //           $rootScope.showAccept = false;
      
      //           $rootScope.showWorkingBtn = true;
      
      //           $scope.selectedTask.Task_Status = "Accepted";
      
      //           $state.go($state.current, {}, { reload: true });
      
      //         });
      //       });
      //     });
      //   }
    }
  }
  startWork():void
  {
    if (this.taskDetails.Task_Status == 'Accepted') {
      
      // if (valueService.getNetworkStatus()) {
      
      //   $rootScope.dbCall = true;
      
      //   valueService.startWorking(valueService.getTask(), function () {
      
      //     $scope.selectedTask.Task_Status = "Working";
      
      //     $rootScope.showWorkingBtn = false;
      
      //     $rootScope.dbCall = false;
      
      //     cloudService.getTaskInternalList("0", function (response) {
      
      //       $state.go($state.current, {}, { reload: true });
      //     });
      //   });
      
      // } else {
      
      //   var taskObject = {
      //     Task_Status: "Working",
      //     Task_Number: valueService.getTask().Task_Number,
      //     Submit_Status: "A",
      //     Date: new Date()
      //   };
      
      //   localService.updateTaskSubmitStatus(taskObject, function (result) {
      
      //     localService.getTaskList(function (response) {
      
      //       localService.getInternalList(function (internalresponse) {
      
      //         angular.forEach(internalresponse, function (item) {
      
      //           var internalOFSCJSONObject = {};
      
      //           internalOFSCJSONObject.Start_Date = item.Start_time;
      //           internalOFSCJSONObject.End_Date = item.End_time;
      //           internalOFSCJSONObject.Type = "INTERNAL";
      //           internalOFSCJSONObject.Customer_Name = item.Activity_type;
      //           internalOFSCJSONObject.Task_Number = item.Activity_Id;
      
      //           response.push(internalOFSCJSONObject);
      //         });
      
      //         constantService.setTaskList(response);
      
      //         $rootScope.showWorkingBtn = false;
      
      //         $state.go($state.current, {}, { reload: true });
      
      //       });
      //     });
      //   });
      // }
    }
  }
  
   showTaskOrDebrief(id:Number):void
  {
    GlobalSharedService.selectedItem = id;
    
   if (id == 3) {
      
    GlobalSharedService.showTaskDetail = true;
      
    GlobalSharedService.selectedCategory = 'Field Job Overview';
      
    } else {
      
      GlobalSharedService.showDebrief = true;
      
      GlobalSharedService.selectedCategory = 'Field Job';
      
     // this.navCtrl.push(FieldjobPage,{"task" : task})
    }
  }
  goToOnsiteReq(){
    this.navCtrl.push(OnsiteRequirementPage, {"selTask": this.taskDetails}).then(()=>{
      const startIndex = this.navCtrl.getActive().index - 1;
      this.navCtrl.remove(startIndex, 1);
    });
  }
}
