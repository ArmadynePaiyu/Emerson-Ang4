import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

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
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  title: String = 'EMERSON';
  menuToggleState: Boolean = false;
  constructor(public events: Events,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private translateService: TranslateService)
   {
   // constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {  
  this.initializeApp();

    // used for an example of ngFor and navigation
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
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
      this.platform.width() < 768 ? this.menuToggleState = true : this.menuToggleState = false;
    });
  }
  gotoMycalendar()
  {
    this.nav.push(CalendarPage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  updateTitles() {
    this.platform.width() < 768 ? this.menuToggleState = true : this.menuToggleState = false;
    this.events.publish('title:updated', { menuState: this.menuToggleState });
  }
}
