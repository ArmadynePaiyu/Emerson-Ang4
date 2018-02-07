import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { TasklistPage } from '../tasklist/tasklist';

import { AuthService } from "../../providers/authService";
import { LocalService } from "../../providers/localService";
import { ConstantService } from "../../providers/constantService";
import { CloudService } from "../../providers/cloudService";

import { User, Task } from '../../providers/model/model';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading:any;
  username: string = "";

  password: string = "";

  constructor(public loadingController:LoadingController,private navController: NavController, private navParams: NavParams, private menuController: MenuController, private authService: AuthService, private localService: LocalService, private cloudService: CloudService, private constantService: ConstantService) {

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

    console.log("START LOGIN ");
     this.loading = this.loadingController.create({content : "Logging in ,please wait..."});
     this.loading.present();
    let baseData = this.username + ":" + this.password;

    let authorizationValue: string = window.btoa(baseData);

    let user: User = new User();

    user.encrypt = authorizationValue;

    user.userName = this.username;

    if (this.constantService.networkStatus) {

      this.authService.login(user).then(response => {

        console.log("LOGIN SUCCESS", response);

        this.localService.getUserList().then(response => {

          if (response.length > 0) {

            response.forEach((item: User) => {

              if (item.Login_Status == "1") {

                this.constantService.currentUser = item;

                this.constantService.lastUpdated = new Date(this.constantService.currentUser.Last_Updated);
              }

            });

            this.syncSubmit("0");
          }

        }, error => {

          console.error("GET USER LIST ERROR", error);
        });

      }, error => {

        console.error("NETWORK ERROR", error);
      });

    } else {

      this.localService.getDatabaseState().subscribe(ready => {

        if (ready) {

          this.localService.getUser(user).then(response => {

            if (response.length > 0) {

              let userObject: User = new User();

              userObject.ID = response[0].ID;
              userObject.Login_Status = "1";

              this.localService.updateLoginStatus(userObject).then(response => {

                this.localService.getUserList().then(response => {

                  if (response.length > 0) {

                    response.forEach((item: User) => {

                      if (item.Login_Status == "1") {

                        this.constantService.currentUser = item;

                        this.constantService.lastUpdated = new Date(this.constantService.currentUser.Last_Updated);
                      }
                    });

                    if (this.constantService.currentUser.ID !== null) {

                      this.localService.getTaskList().then((response: Task[]) => {

                        this.localService.getInternalList().then(internalresponse => {

                          internalresponse.forEach(item => {

                            var internalObject: Task = new Task();

                            internalObject.Start_Date = item.Start_time;
                            internalObject.End_Date = item.End_time;
                            internalObject.Type = "INTERNAL";
                            internalObject.Customer_Name = item.Activity_type;
                            internalObject.Task_Number = item.Activity_Id;

                            response.push(internalObject);
                          });

                          this.constantService.currentTaskList = response;

                          if (this.constantService.currentUser.Default_View == "My Task") {

                            this.navController.setRoot(TasklistPage);

                          } else {

                            this.navController.setRoot(TasklistPage);
                          }

                        });
                      });

                    } else {

                      console.error("INVALID USER DATA");
                    }

                  } else {

                    console.error("GET USER DB ERROR");
                  }

                }, error => {

                  console.error("GET USER DB ERROR", error);
                });

              });

            } else {

              console.error("NOT A VALID USER");
            }

          });

        } else {

          console.error("DB NOT READY");
        }
      });
    }
  };

  syncSubmit(isLogin: string) {

    this.cloudService.getTaskList(isLogin).then(response => { 
      this.loading.dismissAll();
      this.navController.setRoot(TasklistPage);


    }, error => { 

    });
  };
}
