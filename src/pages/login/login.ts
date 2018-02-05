import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { TasklistPage } from '../tasklist/tasklist';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private menu: MenuController) {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login()
  {
    this.navCtrl.setRoot(TasklistPage);
  }
}
