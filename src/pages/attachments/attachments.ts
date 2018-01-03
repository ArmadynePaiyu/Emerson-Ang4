import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AttachmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attachments',
  templateUrl: 'attachments.html',
})
export class AttachmentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttachmentsPage');
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
