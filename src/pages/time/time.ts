import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpensesPage} from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';


@IonicPage()
@Component({
  selector: 'page-time',
  templateUrl: 'time.html',
})
export class TimePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePage');
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
