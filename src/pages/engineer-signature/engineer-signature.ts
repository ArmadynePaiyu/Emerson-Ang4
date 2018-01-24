import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform} from 'ionic-angular';
import {ExpensesPage} from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';
import { TimePage } from '../time/time';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-engineer-signature',
  templateUrl: 'engineer-signature.html',
})
export class EngineerSignaturePage {
  signature = '';
  isDrawing = false;
  engineer:any={}
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: any = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': "",
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,platform: Platform, public storage: Storage) {
    platform.ready().then((readySource) => {
      this.signaturePadOptions.canvasWidth=platform.width()
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EngineerSignaturePage');
  }
  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }
 
  savePad() {
    this.signature = this.signaturePad.toDataURL();//.toDataURL();
    this.storage.set('savedSignature', this.signature);
   // this.signaturePad.clear();
   this.navCtrl.push(SummaryPage);
    // let toast = this.toastCtrl.create({
    //   message: 'New Signature saved.',
    //   duration: 3000
    // });
    // toast.present();
  }
 
  clearPad() {
    this.signaturePad.clear();
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
