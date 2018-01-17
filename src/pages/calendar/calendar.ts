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
  uiCalendar : any;
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

    this.uiCalendar = {
      month : "January",
      weeks : [{
        days : [{
          date : "1"
        },{
          date : "2"
        },{
          date : "3"
        },{
          date : "4"
        },{
          date : "5"
        },{
          date : "6"
        },{
          date : "7"
        }]
      },
      {
        days : [{
          date : "8"
        },{
          date : "9"
        },{
          date : "10"
        },{
          date : "11"
        },{
          date : "12"
        },{
          date : "13"
        },{
          date : "14"
        }]
      },
      {
        days : [{
          date : "15"
        },{
          date : "16"
        },{
          date : "17"
        },{
          date : "18"
        },{
          date : "19"
        },{
          date : "20"
        },{
          date : "21"
        }]
      },
      {
        days : [{
          date : "22"
        },{
          date : "23"
        },{
          date : "24"
        },{
          date : "25"
        },{
          date : "26"
        },{
          date : "27"
        },{
          date : "28"
        }]
      }]
    }

    console.log( this.uiCalendar.weeks)
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

}
