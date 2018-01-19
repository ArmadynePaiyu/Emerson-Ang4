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


@IonicPage()
@Component({
  selector: 'page-time',
  templateUrl: 'time.html',
})
export class TimePage {
  timeArray:Time[];
  isEditTime=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider,public modalCtrl:ModalController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePage');
    this.apiService.getTimeArray().then(time => {
      this.timeArray=time;
    });
    
  }
  
  goToTime(){
    this.navCtrl.setRoot(TimePage);
    
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
    let modal = this.modalCtrl.create(TimePopupPage,{ timeItem: item });
    modal.onDidDismiss(data => {
      console.log(data);
      if(data!=null && data!=undefined && data!="")
      {      this.timeArray[index]=data;
      console.log(index);
      console.log(item);
      }

    });
    modal.present();
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
  
}
