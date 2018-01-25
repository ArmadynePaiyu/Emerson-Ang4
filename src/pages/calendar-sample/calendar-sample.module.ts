import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarSamplePage } from './calendar-sample';

@NgModule({
  declarations: [
    CalendarSamplePage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarSamplePage),
  ],
})
export class CalendarSamplePageModule {}
