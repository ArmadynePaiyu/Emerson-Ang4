import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { TasklistPage } from '../tasklist/tasklist';

import { AuthService } from "../../providers/authService";
import { LocalService } from "../../providers/localService";
import { ConstantService } from "../../providers/constantService";
import { CloudService } from "../../providers/cloudService";
import { ValueService } from '../../providers/valueService';

import { User } from '../../providers/model/model';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: any;
  username: string = "";

  password: string = "";

  constructor(public loadingController: LoadingController, private navController: NavController, private menuController: MenuController, private authService: AuthService, private localService: LocalService, private constantService: ConstantService, private valueService: ValueService) {

    this.menuController.swipeEnable(false);

    console.log('Login Page');
  };

  ionViewWillLeave() {
    this.menuController.swipeEnable(true);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  };

  login() {

    console.log("START LOGIN");

    this.loading = this.loadingController.create({ content: "Logging in ,please wait..." });

    this.loading.present();

    let baseData = this.username + ":" + this.password;

    let authorizationValue: string = window.btoa(baseData);

    let user: User = new User();

    user.encrypt = authorizationValue;

    user.userName = this.username;

    if (this.constantService.networkStatus) {

      this.authService.login(user).then(response => {

        console.log("LOGIN SUCCESS", response);

        this.loading.dismissAll();

        this.navController.setRoot(TasklistPage);

      }, error => {

        console.error("LOGIN ERROR", error);
      });

    } else {

      this.valueService.offlineLogin(user).then(response => {

        this.loading.dismissAll();

        this.navController.setRoot(TasklistPage);

      }, error => {

        console.error("OFFLINE LOGIN ERROR", error);
      });
    }
  };

}
