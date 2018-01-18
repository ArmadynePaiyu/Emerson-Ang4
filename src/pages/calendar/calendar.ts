import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {calen} from '../../providers/model/model';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  calendarOptions :Options;
  uiCalendar : any;
  currentMonth : any = moment();
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

    this.frameCalendar(0);
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  frameCalendar(i){
     this.uiCalendar = this.frameSwiper();
     console.log(this.uiCalendar);
  }

  prevMonth(){
    this.currentMonth = this.currentMonth.subtract(1, 'months');
    this.uiCalendar = this.frameSwiper();
  }

  nextMonth(){
    this.currentMonth = this.currentMonth.add(1, 'months');
    this.uiCalendar =  this.frameSwiper();
  }

    zellerAlgo(num) {
        var startWeek = moment(num).startOf('month').week();
        var endWeek = moment(num).endOf('month').week();
        if(endWeek-startWeek < 0){
            endWeek = endWeek + moment(num).weeksInYear();
        }
        var calendar = []
        for (var week = startWeek; week <= endWeek; week++) {
            var daysarr = [];
            for (var l = 0; l < 7; l++) {
                daysarr.push(moment(num).week(week).startOf('week').clone().add(l, 'day'))
            }
            calendar.push({
                week: week,
                days: daysarr
            })
        }
        return calendar;
    };

    frameSwiper() {
        var dal = this.currentMonth;
        return this.zellerAlgo(dal);
    };
}

//  zellerAlgo(num) {
//         var startWeek = moment(num).startOf('month').week();
//         var endWeek = moment(num).endOf('month').week();
//         if(endWeek-startWeek < 0){
//             endWeek = endWeek + moment(num).weeksInYear();
//         }
//         var calendar = []
//         for (var week = startWeek; week <= endWeek; week++) {
//             var daysarr = [];
//             for (var l = 0; l < 7; l++) {
//                 daysarr.push(moment(num).week(week).startOf('week').clone().add(l, 'day'))
//             }
//             calendar.push({
//                 week: week,
//                 days: daysarr
//             })
//         }
//         return calendar;
//     };

//     frameSwiper() {
//         var value = [];
//         for (var i = 11; i >= 0; i--) {
//             var dal = moment().subtract(i, 'months');
//             var valu = this.zellerAlgo(dal);
//             value.push({
//                 "ind": i,
//                 "momentOjb": dal,
//                 "calendar": valu
//             });
//         }
//         return value;
//     };
