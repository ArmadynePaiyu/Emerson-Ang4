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
  currentDay : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.uiCalendar = this.frameCalendar();
    this.currentDay = {slots :[{Time : "12 AM"},{Time : "1 AM"},{Time : "2 AM"},{Time : "3 AM"},{Time : "4 AM"},{Time : "5 AM"},{Time : "6 AM"},{Time : "7 AM"},{Time : "8 AM"},{Time : "9 AM"},{Time : "10 AM"}]

    }
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }


  prevMonth(){
    this.currentMonth = this.currentMonth.subtract(1, 'months');
    this.uiCalendar = this.frameCalendar();
  }

  nextMonth(){
    this.currentMonth = this.currentMonth.add(1, 'months');
    this.uiCalendar =  this.frameCalendar();
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

    frameCalendar() {
        var dal = this.currentMonth;
        return this.zellerAlgo(dal);
    };
}
