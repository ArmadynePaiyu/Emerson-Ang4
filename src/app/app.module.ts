import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CalendarPage } from '../pages/calendar/calendar';
import { TasklistPage } from '../pages/tasklist/tasklist';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { ModelProvider } from '../providers/model/model';
import { ApiProvider } from '../providers/api/api';
import { FieldjobPage } from '../pages/fieldjob/fieldjob';
import { GlobalSharedService } from '../providers/globalService';
import { ValueService } from '../providers/valueService';
import { FullCalendarModule } from 'ng-fullcalendar';
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
import { SignaturePadModule } from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
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
    NotePopupPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SignaturePadModule,
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    NotePopupPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
 
    ValueService,
    
  ]
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
