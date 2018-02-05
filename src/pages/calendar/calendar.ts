import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {calen} from '../../providers/model/model';
import {ApiProvider} from '../../providers/api/api';
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
  selectedDate="25/01/2018";
  status: any;
  currentEvent: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiService : ApiProvider) {
    this.uiCalendar = this.frameCalendar();
    this.generateTimeSlots();
    
}
  
  generateTimeSlots(){
    this.currentDay = {slots :[]};
    for(let h = 0; h<24; h++){
      this.currentDay.slots.push({
        Time: (h<10?'0'+h:h)+':00'+(h<12?' AM':' PM'),
        hour: h,
        message:'',
        messages:[],
        events:[],
        status: ''
      });
    };
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
        var self = this;
        var startWeek = moment(num).startOf('month').week();
        var endWeek = moment(num).endOf('month').week();
        if(endWeek-startWeek < 0){
            endWeek = endWeek + moment(num).weeksInYear();
        }
        var calendar = []
        for (var week = startWeek, i = 0; week <= endWeek; week++,i++) {
            var daysarr = [];
            for (var l = 0; l < 7; l++) {
              let day = moment(num).week(week).startOf('week').clone().add(l, 'day');
              daysarr.push({day:day,event:''});
              self.getEventCount(day,i,l);
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
    getEventCount(day,week,l){
      var self = this;
      this.apiService.getCalendarData(day).then(ar => {
          self.uiCalendar[week].days[l].event = ar.length;
      });
    };
    getMessageFormat(e){      
      let today = moment(e.Start_Date);
      return e.Customer_Name + ' ('+ today.hour()+':'+today.minute()+')';
    }
    showEvent(ev){
      let event = Object.assign({}, ev);
      if(event.Task_Status){
        this.status = event.Task_Status;
      }
      else{
        this.status = "";
      }
      console.log('in showEvent : ' , event);
      this.currentEvent = [];
      let self = this;
      let keys = Object.keys(event);
      console.log('keys: ', keys);
      keys.forEach((e)=>{
        console.log(event.e);
        if(event[e]){
          if(["Start_Date","End_Date","Date"].indexOf(e)>=0){
            event[e] = moment(event[e]).format("DD/MM/YYYY, h:mm:ss a");
          }
          self.currentEvent.push({
            label: e.replace('_',' '),
            value: event[e]
          });
        }
      });
      console.log('finally: ', this.currentEvent);
    }
    updateDate(event)
    {      
      this.currentEvent = [];
      this.generateTimeSlots();
      let self = this;
      this.selectedDate =  moment(event).format("DD/MM/YYYY");
      this.apiService.getCalendarData(event).then(ar => {
        if(ar.length){
          ar.forEach(function(c){
            let today = moment(c.Start_Date);
            self.currentDay.slots.filter(d=>{
              if(d.hour==today.hour()){
                d.events.push(c);
                if(["Assigned","Accepted","Completed"].indexOf(c.Task_Status)>=0){
                  d.status = c.Task_Status;
                }
              }
            });
          });
        }
      });
    }
}
