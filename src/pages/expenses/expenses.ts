import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { DialogPage } from '../../pages/dialog/dialog';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';
import { Expense } from '../../providers/model/model';
import { ApiProvider } from '../../providers/api/api';
import { TimePage } from '../time/time';
import { ModalcontentPage } from '../modalcontent/modalcontent';
import { ExpensePopupPage } from './expense-popup/expense-popup';

/**
 * Generated class for the ExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {
  expenseArray:Expense[]
  isEditTime=0
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,private apiService:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesPage');
    this.apiService.getExpenseArray().then(time => {
      this.expenseArray=time;
    });
  }
  deleteObject(item,index)
  {
    if (this.isEditTime == 0) {
      
      for (var i = 0; i < this.expenseArray.length; i++) {
        
        if (index == i) {
          
          this.expenseArray.splice(index, 1);
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
    if(item==null || index==-1)
    item= new Expense();
    let modal = this.modalCtrl.create(ExpensePopupPage,{ timeItem: item });
    modal.onDidDismiss(data => {
      console.log(data);
      if(data!=null && data!=undefined && data!="")
      {      
        if(this.expenseArray!=undefined && this.expenseArray.length-1>=index && index!=-1)
        {
          this.expenseArray[index]=data;
        }
        
        else
        {
          if(this.expenseArray==undefined)
          this.expenseArray=[];
          this.expenseArray.push(data);
        }
      }

    });
    modal.present();
  }
  addExpense() {
  let modal = this.modalCtrl.create(ModalcontentPage);
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
    this.navCtrl.push(SummaryPage);
  }

   goToCustomerSignature(){
    this.navCtrl.push(CustomerSignaturePage);
  }

}
