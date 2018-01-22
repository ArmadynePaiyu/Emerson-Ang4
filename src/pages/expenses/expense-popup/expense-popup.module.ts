import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensePopupPage } from './expense-popup';

@NgModule({
  declarations: [
    ExpensePopupPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensePopupPage),
  ],
})
export class ExpensePopupPageModule {}
