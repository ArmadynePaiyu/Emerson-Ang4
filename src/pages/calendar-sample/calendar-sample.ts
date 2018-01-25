import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-calendar-sample',
  templateUrl: 'calendar-sample.html',
})
export class CalendarSamplePage implements OnInit{

  // public date = moment("09-02-2018", "MM-DD-YYYY");;
  public date = moment();
  public showDaySessions: Boolean = true;
  public selectedDate = this.date;
  public daysArray;
  public dayHourlySchedule;
  public weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  constructor(public navCtrl: NavController) {

  }

  public ngOnInit(){
    this.daysArray = this.createCalendar(this.date);
    this.getHourTimeLine();
  }

  public todayCheck(day){
    if(!day){
      return false;
    }
    return moment().format('L') === day.format('L');
  }


  public detectJobClass(schedule,h){
    let res = {
      class: 'grey',
      message: '',
      upperbound: false,
      lowerbound: false
    }, f = false;
    for(let t = 0; t<schedule.length; t++){
      if(h>=schedule[t].start && h<=schedule[t].end){
        res.class = 'green';
        res.upperbound = true;
        res.lowerbound = true;
        if(h === schedule[t].start){
          res.message = schedule[t].startMessage;
          res.upperbound = false;
        }
        else if(h === schedule[t].end){
          res.message = schedule[t].endMessage;
          res.lowerbound = false;
        }
        else if(schedule[t].break && h === schedule[t].break){
          res.class="red";
          res.message = schedule[t].breakMessage;
        }
        f = true;
      }
      if(f)
        break;
    }
    return res;
  }


  public getHourTimeLine(){
    // let hrs = Array.apply(null, {length: 25})
    // .map(Number.call, Number);

    //get this data from external (AJAX)
    let TodaySchedule = [{
      start:8,
      startMessage: 'Start work on FieldJob 2071',
      break: 10,
      breakMessage: 'Break',
      end: 11,
      endMessage: 'End work on FieldJob 2071'
    },{
      start:16,
      startMessage: 'Start work on FieldJob 2072',
      end: 19,
      endMessage: 'End work on FieldJob 2072'
    }]


    let schedules = [];
    for(let h = 0; h<25; h++){
      let hourInfo = this.detectJobClass(TodaySchedule,h);
      schedules.push({
        hour: (h<10?'0'+h:h)+':00'+(h<12?' AM':' PM'),
        class: hourInfo.class,
        message: hourInfo.message,
        upperbound: hourInfo.upperbound,
        lowerbound: hourInfo.lowerbound
      });
    }

    this.dayHourlySchedule = schedules;
    console.log(this.dayHourlySchedule);
  }

  public createCalendar(month){
    let firstDay = moment(month).startOf('M');
    // console.log('moment(month).startOf("M") : ' , moment(month).startOf('M'));
    // console.log('firstDay : ' , firstDay);
    // console.log('month.daysInMonth() : ' , month.daysInMonth());
    let days = Array.apply(null, {length:month.daysInMonth()})
                .map(Number.call, Number)
                .map((n)=>{
                  return moment(firstDay).add(n,'d');
                });

    // console.log('firstDay.weekday() : ' , firstDay.weekday());
    // console.log('days: ' , days);
    for(let n = 0;n<firstDay.weekday();n++){
      days.unshift(null);
    }
    return days;
  }

  public dateSelected(date){
    this.selectedDate = date;
    this.getHourTimeLine();
    if(!this.showDaySessions){
      this.toggleDaySession();
    }
  }

  public nextMonth(){
    this.date.add(1,'M');
    this.daysArray = this.createCalendar(this.date);
  }

  public prevMonth(){
    this.date.subtract(1, 'M');
    this.daysArray = this.createCalendar(this.date);
  }

  public toggleDaySession(){
    this.showDaySessions = !this.showDaySessions;
  }

}
