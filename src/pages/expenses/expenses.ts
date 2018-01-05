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
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalView:ModalController,private apiService:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesPage');
    this.apiService.getExpenseArray().then(time => {
      this.expenseArray=time;
    });
  }

  showExpenseMo() {
  let modal = this.modalView.create(DialogPage);
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
    this.navCtrl.setRoot(SummaryPage);
  }

   goToCustomerSignature(){
    this.navCtrl.setRoot(CustomerSignaturePage);
  }

}
