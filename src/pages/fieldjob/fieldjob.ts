import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskDetail, InstallBase } from '../../providers/model/model';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the FieldjobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fieldjob',
  templateUrl: 'fieldjob.html',
})
export class FieldjobPage {
  taskDetails:TaskDetail;
  installBase;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService : ApiProvider) {
    this.taskDetails = this.navParams.get("task");
    this.taskDetails.InstallBase=[];
    console.log(this.taskDetails);
    console.log("11111111111111111111111111")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldjobPage');
    this.apiService.getInstallBase().subscribe(data =>{
      
            // console.log(data)
            // data.InstallBase.forEach(function (eachObj) {
            //  if(eachObj.Task_Number== this.taskDetails.Task_Number)
            //  {
            //   this.taskDetails.InstallBase.push(eachObj);
            //  }
            // });

            this.installBase = data;
            console.log(this.installBase.InstallBase);
            this.installBase.InstallBase.forEach(function(eachObj)
            {
              console.log("55555555555555555555555555555")
              if(eachObj.Task_Number== this.taskDetails.Task_Number)
              {
                this.taskDetails.InstallBase.push(eachObj);
              }
            },this)
         
        });
 
}

}
