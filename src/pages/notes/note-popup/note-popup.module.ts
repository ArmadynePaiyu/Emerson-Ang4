import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotePopupPage } from './note-popup';

@NgModule({
  declarations: [
    NotePopupPage,
  ],
  imports: [
    IonicPageModule.forChild(NotePopupPage),
  ],
})
export class NotePopupPageModule {}
