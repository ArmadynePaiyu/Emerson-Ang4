import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimePopupPage } from './timePopup';


@NgModule({
  declarations: [
    TimePopupPage,
  ],
  imports: [
    IonicPageModule.forChild(TimePopupPage),
  ],
})
export class TimePopupPageModule {}
