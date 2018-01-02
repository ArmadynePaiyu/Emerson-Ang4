import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskDetails} from '../../providers/model/model';
import {ApiProvider} from '../../providers/api/api';

/**
 * Generated class for the TasklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TasklistPage {
  tasklists : TaskDetails[];
  users: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiService : ApiProvider) {
  }
 
  ionViewDidLoad() {
   this.apiService.getTaskDetails().subscribe(data =>{
    this.users  =data;
    console.log(this.users);
    this.tasklists = this.users.TaskDetails;
    }  )
    
  }

  getTaskListArr() :void {
    console.log(this.apiService.getTaskDetails());
  }
}
