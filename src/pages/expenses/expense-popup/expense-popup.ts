import { Component,ElementRef, ViewChild,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Expense, LOV } from '../../../providers/model/model';
import { ApiProvider } from '../../../providers/api/api';
import { ViewController } from 'ionic-angular/navigation/view-controller';



// import { ElementRef } from '@angular/core/src/linker/element_ref';

/**
 * Generated class for the ExpensePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-popup',
  templateUrl: 'expense-popup.html',
})
export class ExpensePopupPage {
  expenseDetails:Expense;
  chargeMethods:LOV[];
  uoms:LOV[];
  currency:LOV[];
  expenseTypes:LOV[];
  @ViewChild('endDatePicker') endDatePicker:ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider,public viewCtrl: ViewController,private renderer: Renderer) {
    this.expenseDetails =Object.assign({}, this.navParams.get("timeItem")); ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensePopupPage');
    this.apiService.getLOVDetails().then(lovDetails => {
      var lovDetailsres:any=lovDetails
      this.chargeMethods=lovDetailsres.getLOVDetails[0].Charge_Method;
      this.currency=lovDetailsres.getLOVDetails[2].Currencies;
      this.uoms=lovDetailsres.getLOVDetails[7].UnitsOfMeasurement;
      this.expenseTypes=lovDetailsres.getLOVDetails[3].ExpenseType;
    });
  }
  closePopup()
  {
    this.viewCtrl.dismiss();
  } 
  saveTimeObject()
  {
    this.viewCtrl.dismiss(this.expenseDetails);
  }
  setEndDatePickerClass($event:any)
  {
    this.renderer.setElementClass(event.target,"customePicker",true);
    setTimeout(() => {
      let picker:any
      picker= document.getElementsByClassName('picker-wrapper')
      picker[0].classList.add("customePicker");
    },100);
    if(this.endDatePicker)
    {
     // this.endDatePicker._elementRef.nativeElement.className="customePicker"
    }
  }
  compareFn(e1: LOV, e2: LOV): boolean 
  {
    return e1 && e2 ? e1.ID === e2.ID : e1 === e2;
  }
}
