import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LOV, Material } from '../../../providers/model/model';
import { ApiProvider } from '../../../providers/api/api';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
* Generated class for the MaterialPopupPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-material-popup',
  templateUrl: 'material-popup.html',
})
export class MaterialPopupPage {
  materialDetails:Material;
  chargeMethods:LOV[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider,public viewCtrl: ViewController) {
    this.materialDetails =Object.assign({}, this.navParams.get("timeItem")); ;
    this.materialDetails.serialType = Object.assign([], this.materialDetails.serialType); ;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePopupPage');
    this.apiService.getLOVDetails().then(lovDetails => {
      var lovDetailsres:any=lovDetails
      this.chargeMethods=lovDetailsres.getLOVDetails[0].Charge_Method;
    //   this.chargeMethods.forEach(function(object)
    // {
    //     if(this.materialDetails.chargeMethod.ID==object.ID)
    //     {
    //       this.materialDetails.chargeMethod=object;
    //     }
    // }.bind(this))
    });
  }
  closePopup()
  {
    this.viewCtrl.dismiss();
  } 
  saveTimeObject()
  {
    this.viewCtrl.dismiss(this.materialDetails);
  }
  addSerialItem ()
   {
    
    this.materialDetails.productQuantity++;
    let serialObj:any={ "serialIn": "", "serialOut": "", "seriallNumber": "" };
    this.materialDetails.serialType.push(serialObj);
  };
  
  deleteSerialItem () 
  {
    
    this.materialDetails.productQuantity--;
    
    this.materialDetails.serialType.splice(this.materialDetails.serialType.length - 1, 1);
  };
  compareFn(e1: LOV, e2: LOV): boolean 
  {
    return e1 && e2 ? e1.ID === e2.ID : e1 === e2;
  }
}
