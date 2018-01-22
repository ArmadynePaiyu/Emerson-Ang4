import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LOV, NotesDebrief } from '../../../providers/model/model';
import { ApiProvider } from '../../../providers/api/api';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the NotePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-popup',
  templateUrl: 'note-popup.html',
})
export class NotePopupPage {
  noteDetails:NotesDebrief;
  noteTypes:LOV[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider,public viewCtrl: ViewController) {
    this.noteDetails =Object.assign({}, this.navParams.get("timeItem")); ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePopupPage');
    this.apiService.getLOVDetails().then(lovDetails => {
      var lovDetailsres:any=lovDetails
      this.noteTypes=lovDetailsres.getLOVDetails[5].Notes_Type;
     
    });
  }
  closePopup()
  {
    this.viewCtrl.dismiss();
  } 
  saveTimeObject()
  {
    this.viewCtrl.dismiss(this.noteDetails);
  }
  setEndDatePickerClass($event:any)
  {
    setTimeout(() => {
      let picker:any
      picker= document.getElementsByClassName('picker-wrapper')
      picker[0].classList.add("customePicker");
    },100);
   
  }
  compareFn(e1: LOV, e2: LOV): boolean 
  {
    return e1 && e2 ? e1.ID === e2.ID : e1 === e2;
  }
}
