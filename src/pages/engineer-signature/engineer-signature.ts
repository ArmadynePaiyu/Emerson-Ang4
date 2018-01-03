import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExpensesPage} from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { AttachmentsPage } from '../attachments/attachments';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';

/**
 * Generated class for the EngineerSignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-engineer-signature',
  templateUrl: 'engineer-signature.html',
})
export class EngineerSignaturePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EngineerSignaturePage');
  }

}
