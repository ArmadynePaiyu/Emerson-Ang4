import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { LocalService } from '../providers/localService';
import { ConstantService } from '../providers/constantService';

import { User, Task } from '../providers/model/model';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarPage } from '../pages/calendar/calendar';
import { TasklistPage } from '../pages/tasklist/tasklist';
import { TimePage } from '../pages/time/time';
import { FieldjobPage } from '../pages/fieldjob/fieldjob';
import { OnsiteRequirementPage } from '../pages/onsite-requirement/onsite-requirement';
import { ExpensesPage } from '../pages/expenses/expenses';
import { AttachmentsPage } from '../pages/attachments/attachments';
import { MaterialPage } from '../pages/material/material';
import { NotesPage } from '../pages/notes/notes';
import { CalendarSamplePage } from '../pages/calendar-sample/calendar-sample';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  title: String = 'EMERSON';

  menuToggleState: Boolean = false;

  constructor(private network: Network, private events: Events, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private translateService: TranslateService, private localService: LocalService, private constantService: ConstantService) {

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Calendar', component: CalendarPage },
      { title: 'TaskList', component: TasklistPage }
    ];

    events.subscribe('title:updated', (data) => {
      if (data.menuState) {
        this.title = "Projects";
      } else {
        this.title = ' ';
      }
    });
  }

  initializeApp() {

    console.log("APP START");

    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
      this.platform.width() < 768 ? this.menuToggleState = true : this.menuToggleState = false;

      this.checkConnection();

      this.checkDataBase();

    });
  };

  checkConnection() {

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {

      console.log("NETWORK DISCONNECTED");

      console.log("CONNECTION TYPE", this.network.type);

      this.constantService.networkStatus = false;

    });

    // disconnectSubscription.unsubscribe();

    let connectSubscription = this.network.onConnect().subscribe(() => {

      console.log("NETWORK CONNECTED");

      setTimeout(() => {

        console.log("CONNECTION TYPE", this.network.type);

        if (this.network.type === 'none') {

          this.constantService.networkStatus = false;

        } else {

          this.constantService.networkStatus = true;
        }

      }, 3000);
    });

    // connectSubscription.unsubscribe();

    console.log("CONNECTION TYPE", this.network.type);

    if (this.network.type === 'none') {

      this.constantService.networkStatus = false;

    } else {

      this.constantService.networkStatus = true;
    }
  };

  checkDataBase() {

    this.localService.getDatabaseState().subscribe(ready => {

      console.log("APP START DB READY", ready);

      if (ready) {

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

                    this.rootPage = TasklistPage;

                  } else {

                    this.rootPage = TasklistPage;
                  }

                });
              });

            } else {

              this.rootPage = LoginPage;
            }

          } else {

            this.rootPage = LoginPage;
          }

        });

      } else {

        console.error("DB NOT READY");

        // this.rootPage = LoginPage;
      }
    });
  };

  gotoMycalendar() {
    this.nav.push(CalendarPage);
  };

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  };

  updateTitles() {
    this.platform.width() < 768 ? this.menuToggleState = true : this.menuToggleState = false;
    this.events.publish('title:updated', { menuState: this.menuToggleState });
  };
}
