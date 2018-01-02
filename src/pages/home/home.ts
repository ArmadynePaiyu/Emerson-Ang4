import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {TaskDetails} from '../../providers/model/model';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public apiService : ApiProvider) {
  }
  ionViewDidLoad(){
    this.apiService.getContacts();
  }
}
