import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpensesPage} from '../expenses/expenses';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';
import { TimePage } from '../time/time';
import { Material } from '../../providers/model/model';
import { ApiProvider } from '../../providers/api/api';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { MaterialPopupPage } from './material-popup/material-popup';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material',
  templateUrl: 'material.html',
})
export class MaterialPage {

  materialArray:Material[];
  isEditTime=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider,public modalCtrl:ModalController,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaterialPage');
    this.apiService.getMaterialArray().then(material => {
      this.materialArray=material;
      
    });
  }
  deleteObject(item,index)
  {
    if (this.isEditTime == 0) {
      
      for (var i = 0; i < this.materialArray.length; i++) {
        
        if (index == i) {
          
          this.materialArray.splice(index, 1);
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
    item= new Material();
    isEdit=false;
    }
    let modal = this.modalCtrl.create(MaterialPopupPage,{ timeItem: item,"isedit": isEdit });
    modal.onDidDismiss(data => {
      console.log(data);
      if(data!=null && data!=undefined && data!="")
      {    
        if(this.materialArray!=undefined && this.materialArray.length-1>=index && index!=-1)
        {
          this.materialArray[index]=data;
        }
        
        {
          if(this.materialArray==undefined)
          this.materialArray=[];
          this.materialArray.push(data);
        }
      console.log(index);
      console.log(item);
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
    this.storage.set('material',this.materialArray);
    this.navCtrl.push(SummaryPage);
  }

   goToCustomerSignature(){
    this.navCtrl.push(CustomerSignaturePage);
  }
  ionViewWillLeave()
  {
    this.storage.set('material',this.materialArray);
  }
}
