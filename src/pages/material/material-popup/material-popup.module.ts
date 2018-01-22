import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaterialPopupPage } from './material-popup';

@NgModule({
  declarations: [
    MaterialPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(MaterialPopupPage),
  ],
})
export class MaterialPopupPageModule {}
