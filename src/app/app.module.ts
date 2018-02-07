import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { FullCalendarModule } from 'ng-fullcalendar';
import { SignaturePadModule } from 'angular2-signaturepad';

import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { AuthService } from '../providers/authService';
import { LocalService } from "../providers/localService";
import { CloudService } from "../providers/cloudService";
import { ConstantService } from "../providers/constantService";
import { ValueService } from "../providers/valueService";
import { GlobalService } from "../providers/globalService";

import { MyApp } from './app.component';
import { ENV } from '@app/env'

import { ApiProvider } from '../providers/api/api';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarPage } from '../pages/calendar/calendar';
import { TasklistPage } from '../pages/tasklist/tasklist';
import { FieldjobPage } from '../pages/fieldjob/fieldjob';
import { OnsiteRequirementPage } from '../pages/onsite-requirement/onsite-requirement';
import { TimePage } from '../pages/time/time';
import { ExpensesPage } from '../pages/expenses/expenses';
import { SummaryPage } from '../pages/summary/summary';
import { EngineerSignaturePage } from '../pages/engineer-signature/engineer-signature';
import { MaterialPage } from '../pages/material/material';
import { CustomerSignaturePage } from '../pages/customer-signature/customer-signature';
import { NotesPage } from '../pages/notes/notes';
import { AttachmentsPage } from '../pages/attachments/attachments';
import { ModalcontentPage } from '../pages/modalcontent/modalcontent';
import { TimePopupPage } from '../pages/time/timePopup';
import { ExpensePopupPage } from '../pages/expenses/expense-popup/expense-popup';
import { MaterialPopupPage } from '../pages/material/material-popup/material-popup';
import { NotePopupPage } from '../pages/notes/note-popup/note-popup';
import { CalendarSamplePage } from '../pages/calendar-sample/calendar-sample';

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

// import { SplitPaneProvider } from '../providers/split-pane/split-pane';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    CalendarPage,
    TasklistPage,
    FieldjobPage,
    OnsiteRequirementPage,
    TimePage,
    ExpensesPage,
    SummaryPage,
    EngineerSignaturePage,
    MaterialPage,
    CustomerSignaturePage,
    NotesPage,
    AttachmentsPage,
    ModalcontentPage,
    TimePopupPage,
    ExpensePopupPage,
    MaterialPopupPage,
    NotePopupPage,
    CalendarSamplePage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SignaturePadModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    CalendarPage,
    TasklistPage,
    FieldjobPage,
    OnsiteRequirementPage,
    TimePage,
    ExpensesPage,
    SummaryPage,
    EngineerSignaturePage,
    MaterialPage,
    CustomerSignaturePage,
    NotesPage,
    AttachmentsPage,
    ModalcontentPage,
    TimePopupPage,
    ExpensePopupPage,
    MaterialPopupPage,
    NotePopupPage,
    CalendarSamplePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    Network,
    SQLite,
    SQLitePorter,
    AuthService,
    LocalService,
    CloudService,
    ConstantService,
    ValueService,
    GlobalService,
    ApiProvider,
    File
    
  ]
})
export class AppModule {

  constructor() {

    console.log("APP MODULE");

    console.log(ENV.mode);
  };
}

export function createTranslateLoader(http: HttpClient) {

  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}