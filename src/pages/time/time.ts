import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpensesPage} from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';
import { ApiProvider } from '../../providers/api/api';
import { Time } from '../../providers/model/model';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { TimePopupPage } from './timePopup';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-time',
  templateUrl: 'time.html',
})
export class TimePage {
  timeArray:Time[];
  isEditTime=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider,public modalCtrl:ModalController,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePage');

    this.apiService.getTimeArray().then(time => {
      this.timeArray=time;
    });

  }



  deleteObject(item,index)
  {
    if (this.isEditTime == 0) {

      for (var i = 0; i < this.timeArray.length; i++) {

        if (index == i) {

          this.timeArray.splice(index, 1);
        }
      }

      //   this.timeArray.reverse();

      //   var i = 1;

      //   this.timeArray.forEach(function (response) {

      //     response.timeId = this.taskId + "" + i;

      //     i++;

      //     console.log("DELETE " + JSON.stringify(response));
      //   });

      //   this.timeArray.reverse();
    }
  }
  editObject(item,index)
  {
    let isEdit=true;
    if(item==null || index==-1)
    {
    item= new Time();
    isEdit=false;
    }
    let modal = this.modalCtrl.create(TimePopupPage,{ timeItem: item ,"isedit": isEdit});
    modal.onDidDismiss(data => {
      console.log(data);
      if(data!=null && data!=undefined && data!="")
      {
        if(this.timeArray!=undefined && this.timeArray.length-1>=index && index!=-1)
        {
          this.timeArray[index]=data;
        }

        else
        {
          if(this.timeArray==undefined)
          this.timeArray=[];
          this.timeArray.push(data);
        }
        console.log(index);
        console.log(item);
      }

    });
    modal.present();
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
    this.storage.set('time',this.timeArray);
    this.navCtrl.setRoot(SummaryPage);
  }

  goToCustomerSignature(){
    this.navCtrl.setRoot(CustomerSignaturePage);
  }


  ionViewWillLeave()
  {
    this.storage.set('time',this.timeArray);
  }

}
