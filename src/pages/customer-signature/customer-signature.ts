import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpensesPage} from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { SummaryPage } from '../summary/summary';

@IonicPage()
@Component({
  selector: 'page-customer-signature',
  templateUrl: 'customer-signature.html',
})
export class CustomerSignaturePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSignaturePage');
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
