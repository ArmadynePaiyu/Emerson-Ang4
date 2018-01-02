import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FieldjobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fieldjob',
  templateUrl: 'fieldjob.html',
})
export class FieldjobPage {
  taskdetail;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.taskdetail = this.navParams.get("task");
    console.log(this.taskdetail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldjobPage');
  }

}
