import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  calendarOptions :Options;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [{
        title: 'New event',
        start: '2018-01-01',
        end: '2018-01-10',
      }]
    };
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
