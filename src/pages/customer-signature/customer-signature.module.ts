import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerSignaturePage } from './customer-signature';

@NgModule({
  declarations: [
    CustomerSignaturePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerSignaturePage),
  ],
})
export class CustomerSignaturePageModule {}
