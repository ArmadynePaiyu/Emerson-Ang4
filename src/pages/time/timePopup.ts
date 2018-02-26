import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TaskName, TaskDetail, OverTimeShiftCode, ShiftCode, LOV } from '../../providers/model/model';
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { ViewController } from 'ionic-angular/navigation/view-controller';



/**
 * Generated class for the TimePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timePopupcontent',
  templateUrl: 'timePopup.html',
})
export class TimePopupPage {
  taskNames:TaskName[];
  timeDetails:Time;
  timeCodes:OverTimeShiftCode[];
  shiftCodes:ShiftCode[];
  chargeMethods:LOV[];
  workTypes:LOV[];
  items:LOV[];
  chargeTpes:LOV[];
  isEdit:boolean;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider) {
    this.timeDetails =Object.assign({}, this.navParams.get("timeItem")); ;
    this.isEdit=this.navParams.get("isedit");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePopupPage');
    this.apiService.getProjectDetails().then(projectDetails => {
      var projectDetailsres:any=projectDetails
      this.timeCodes=projectDetailsres.getProjectDetails[0].OverTImeShiftCode;
      this.shiftCodes=projectDetailsres.getProjectDetails[1].ShiftCode;
      this.taskNames=projectDetailsres.getProjectDetails[2].TaskName;
    });
    this.apiService.getLOVDetails().then(lovDetails => {
      var lovDetailsres:any=lovDetails
      this.chargeMethods=lovDetailsres.getLOVDetails[0].Charge_Method;
      this.chargeTpes=lovDetailsres.getLOVDetails[1].Charge_Type;
      this.items=lovDetailsres.getLOVDetails[4].Items;
      this.workTypes=lovDetailsres.getLOVDetails[6].WorkType;
    });
  }
  closePopup()
  {
    this.viewCtrl.dismiss();
  }
  saveTimeObject()
  {
    this.viewCtrl.dismiss(this.timeDetails);
  }
  openDatePicker()
  {
    // this.calendar.createCalendar('MyCalendar').then(
    //   (msg) => { console.log(msg); },
    //   (err) => { console.log(err); }
    // );
  }
}
