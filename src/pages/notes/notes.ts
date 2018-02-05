import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpensesPage} from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { AttachmentsPage } from '../attachments/attachments';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';
import { TimePage } from '../time/time';
import { Notes, NotesDebrief } from '../../providers/model/model';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ApiProvider } from '../../providers/api/api';
import { NotePopupPage } from './note-popup/note-popup';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
  noteArray:NotesDebrief[]
  isEditTime=0
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,private apiService:ApiProvider,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
    this.apiService.getNotesArray().then(data => {
      this.noteArray=data;
    });
  }
  ionViewWillLeave()
  {
    this.storage.set('notes',this.noteArray);
  }
  deleteObject(item,index)
  {
    if (this.isEditTime == 0) {
      
      for (var i = 0; i < this.noteArray.length; i++) {
        
        if (index == i) {
          
          this.noteArray.splice(index, 1);
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
      item= new NotesDebrief();
      isEdit=false;
    }
    let modal = this.modalCtrl.create(NotePopupPage,{ timeItem: item,"isedit": isEdit});
    modal.onDidDismiss(data => {
      console.log(data);
      if(data!=null && data!=undefined && data!="")
      {       
        if(this.noteArray!=undefined && this.noteArray.length-1>=index && index!=-1)
        {
          this.noteArray[index]=data;
        }
        
        else
        {
          if(this.noteArray==undefined)
          this.noteArray=[];
          this.noteArray.push(data);
        }
      }

    });
    modal.present();
  }
  goToTime(){
    this.navCtrl.push(TimePage);
  }

  goToExpense(){
    this.navCtrl.push(ExpensesPage);
  }

  goToMaterial(){
    this.navCtrl.push(MaterialPage);
  }

   goToNotes(){
    this.navCtrl.push(NotesPage);
  }

   goToAttachments(){
    this.navCtrl.push(AttachmentsPage);
  }

   goToEngineerSignature(){
    this.navCtrl.push(EngineerSignaturePage);
  }

   goToSummary(){
    this.storage.set('notes',this.noteArray);
    this.navCtrl.push(SummaryPage);
  }

   goToCustomerSignature(){
    this.navCtrl.push(CustomerSignaturePage);
  }

}
