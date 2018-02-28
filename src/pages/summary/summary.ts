import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import {ExpensesPage} from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';
import { TimePage } from '../time/time';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

/**
* Generated class for the SummaryPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  summary:any={}
  userType="C";

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public apiService : ApiProvider) {
    this.summary.taskObject={};
    this.summary.timeArray=[]
    this.summary.materiaArray=[]
  }
  timeCodes:any=[];
  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');

    this.storage.get('task').then((data) => {
      this.summary.taskObject = data;
      this.summary.taskObject.times = [];

      this.summary.taskObject.times.push({
        "Start_Date": data.Start_Date,
        "End_Date": data.End_Date,
        "Duration": data.Duration
      });
      this.summary.taskObject.InstallBase = [];
      this.apiService.getInstallBase().subscribe(data =>{
        let installBase:any  =data;
        installBase.InstallBase.forEach(function(obj)
        {
          if(obj.Task_Number==this.summary.taskObject.Task_Number)
          {
            this.summary.taskObject.InstallBase.push(obj);
          }
        }.bind(this))

      }  )
    });
    this.storage.get('material').then((data) => {
      this.summary.materiaArray = data;

    },(error)=>{
      console.log(error);
    }
    );
    this.storage.get('notes').then((data) => {
      this.summary.notesArray = data;

    },(error)=>{
      console.log(error);
    }
  );
  this.storage.get('time').then((data) => {
    var timeArray = data;
    this.apiService.getProjectDetails().then(projectDetails => {
      var projectDetailsres:any=projectDetails
      this.timeCodes=projectDetailsres.getProjectDetails[0].OverTImeShiftCode;
      projectDetailsres.getProjectDetails[0].OverTImeShiftCode.forEach(function(obj)
      {
        if(obj.Task_Number==this.summary.taskObject.Task_Number)
        {
          this.timeCodes.push(obj);
        }
      }.bind(this))
      if(timeArray!=undefined && timeArray.length>0){
        var length = timeArray.length, i = 0;

        var grandTotalTimeArray = [];

        var subTotalTimeArray = [];

        this.timeCodes.forEach(function (timecode, value) {

          var codeobj = {};

          var codeobj1 = {};

          codeobj[timecode.Overtimeshiftcode] = 0;

          codeobj1[timecode.Overtimeshiftcode] = 0;

          grandTotalTimeArray.push(codeobj);

          subTotalTimeArray.push(codeobj1);

        });

        var grandtimeObject:any =this.getTimenewObj("GRAND \n TOTAL", "", "", "", "", "", "", 0, "", "", "", "", true);

        var subtotalObject = this.getTimenewObj("", "SUB TOTAL", "", "", "", "", "", 0,"","","","");

        var subTotalArray = [];

        timeArray.forEach( function (key, value) {

          grandtimeObject.Duration = this.calculateDuration(grandtimeObject, key);

          grandtimeObject.Duration = this.formatDuration(grandtimeObject.Duration);

          //$scope.populateTimeCodeArray(grandTotalTimeArray, key);

          if (subTotalArray.length > 0) {

            var keepGoing = true;
            let newWorkType=false;
            subTotalArray.forEach( function (subtotalObj, value) {

              if (keepGoing) {

                if (subtotalObj.Work_Type == key.workType.Value) {

                  newWorkType = false;

                  //  $scope.populateTimeCodeArray(subTotalTimeArray, key);

                  subtotalObj.Duration = this.calculateDuration(subtotalObj, key);

                  subtotalObj.Duration = this.formatDuration(subtotalObj.Duration);

                  keepGoing = false;

                } else {

                  newWorkType = true;
                }
              }
            }.bind(this));

            if (newWorkType) {

              subtotalObject = this.getTimenewObj(key.workType.Value, "SUB TOTAL", "", "", "", "", "", 0);

              subTotalTimeArray = [];

              this.timeCodes.forEach( function (timecode, value) {

                var codeobj = {};

                codeobj[timecode.Overtimeshiftcode] = 0;

                subTotalTimeArray.push(codeobj);
              });

              //$scope.populateTimeCodeArray(subTotalTimeArray, key);

              //subtotalObject.timecode = subTotalTimeArray;

              subtotalObject.Duration = this.calculateDuration(subtotalObject, key);

              subtotalObject.Duration = this.formatDuration(subtotalObject.Duration)
              subtotalObject.Date = '';
              subTotalArray.push(subtotalObject);
            }

          } else if (subTotalArray.length == 0) {

            subtotalObject.Work_Type = key.workType.Value;

            //$scope.populateTimeCodeArray(subTotalTimeArray, key);

            //subtotalObject.timecode = subTotalTimeArray;

            subtotalObject.Duration = this.calculateDuration(subtotalObject, key);

            subtotalObject.Duration = this.formatDuration(subtotalObject.Duration);
            subtotalObject.startedSummingUp = true;
            subTotalArray.push(subtotalObject);
          }

          if (timeArray.length > 0) {

            var newTimecode = true;

            if (newTimecode) {

              var timeObject = this.getTimenewObj(key.workType.Value, key.date, key.chargeType.Value, key.chargeMethod.Value, key.item.Value, key.description, "", key.duration, key.timeCode.Overtimeshiftcode, key.shiftCode.ShiftCodeName, key.startTime, key.endTime);

              timeObject.Duration = this.calculateDuration(timeObject, key);
              timeObject.Duration = this.formatDuration(timeObject.Duration);
              this.summary.timeArray.push(timeObject);
            }

          } else {

            var timeObject =this.getTimenewObj(key.workType.Value, key.date, key.chargeType.Value, key.chargeMethod.Value, key.item.Value, key.description, "", key.duration, key.timeCode.Overtimeshiftcode, key.shiftCode.ShiftCodeName, key.startTime, key.endTime);

            timeObject.Duration = this.calculateDuration(timeObject, key);
            timeObject.Duration = this.formatDuration(timeObject.Duration)
            this.summary.timeArray.push(timeObject)
          }



        }.bind(this));

        grandtimeObject.timecode = grandTotalTimeArray;

        subTotalArray.forEach(function (obj, value) {
          this.summary.timeArray.push(obj);
        }.bind(this));
        grandtimeObject.totalCalculated = true;
        this.summary.timeArray.push(grandtimeObject)
      }
    });

  },(error)=>{
    console.log(error);
  }
  );
 this.storage.get("savedSignature").then((data)=>{
  this.summary.engineer={};
  this.summary.engineer.signature=data;
 })
 this.storage.get("attachments").then((data)=>{
  this.summary.attachments=[];
  this.summary.attachments=data;
 })
}


goToTime(){
  this.navCtrl.setRoot(TimePage);
}

goToExpense(){
  this.navCtrl.setRoot(ExpensesPage);
}

goToMaterial(){
  this.navCtrl.setRoot(MaterialPage);
}

goToNotes(){
  this.navCtrl.setRoot(NotesPage);
}

goToAttachments(){
  this.navCtrl.setRoot(AttachmentsPage);
}

goToEngineerSignature(){
  this.navCtrl.setRoot(EngineerSignaturePage);
}

goToSummary(){
  this.navCtrl.setRoot(SummaryPage);
}

goToCustomerSignature(){
  this.navCtrl.setRoot(CustomerSignaturePage);
}

calculateDuration(obj, key) {
  if(key.DurationHours==undefined)
  key.DurationHours=8;
  if(key.DurationMinutes==undefined)
  key.DurationMinutes=0;
  obj.hours += key.DurationHours;

  obj.mins += key.DurationMinutes;

  var reminder = obj.mins % 60;

  obj.hours += Math.floor(obj.mins / 60);

  if (obj.mins >= 60)
  obj.mins = reminder;

  var duration = obj.hours + ":" + reminder;

  return obj.hours + ":" + reminder;
};

formatDuration(duration) {

  if (duration.split(":")[0].length == 1) {

    var hours = "0" + duration.split(":")[0];

    duration = hours + ":" + duration.split(":")[1];
  }

  if (duration.split(":")[1].length == 1) {

    var mins = "0" + duration.split(":")[1];

    duration = duration.split(":")[0] + ":" + mins;
  }

  return duration;
}

populateTimeCodeArray(timeArray, key) {

  timeArray.forEach(function (timecode, value) {

    if (timecode.mins == undefined)
    timecode.mins = 0;

    if (timecode.hours == undefined)
    timecode.hours = 0;

    timecode.forEach( function (shifkey, value) {

      if (value == key.Time_Code.Overtimeshiftcode) {

        timecode[value] = this.calculateDuration(timecode, key);

        if (timecode[value].split(":")[0].length == 1) {

          var hours = "0" + timecode[value].split(":")[0];

          timecode[value] = hours + ":" + timecode[value].split(":")[1];
        }

        if (timecode[value].split(":")[1].length == 1) {

          var mins = "0" + timecode[value].split(":")[1];

          timecode[value] = timecode[value].split(":")[0] + ":" + mins;
        }
      }
    }.bind(this));
  }.bind(this));
};

getTimenewObj(worktype, date, chargetype, chargemethod, item, desc, commets, duration, timecode, shiftcode, startTime, endTime, isGrandtotal = false)
{

  var weight;

  if (isGrandtotal)
  weight = "bold";
  else
  weight = "normal";

  var timeObj = {
    "Date": date,
    "Charge_Type": chargetype,
    "Charge_Method": chargemethod,
    "Work_Type": worktype,
    "Item": item,
    "Description": desc,
    "Comments": commets,
    "Duration": duration,
    "mins": 0,
    "hours": 0,
    "Time_Code": timecode,
    "Shift_Code": shiftcode,
    "grandTotal": weight,
    "startTime": startTime,
    "endTime": endTime,
    "startedSummingUp":false,
    "totalCalculated":false
  };

  return timeObj;
};
}
