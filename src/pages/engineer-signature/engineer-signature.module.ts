import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EngineerSignaturePage } from './engineer-signature';

@NgModule({
  declarations: [
    EngineerSignaturePage,
  ],
  imports: [
    IonicPageModule.forChild(EngineerSignaturePage),
  ],
})
export class EngineerSignaturePageModule {}
