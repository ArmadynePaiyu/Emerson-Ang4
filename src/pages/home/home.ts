import { Component, OnInit, ViewEncapsulation, Output, HostListener, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
import $ from 'jquery/dist/jquery';

@Component({
  selector: 'page-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  // public date = moment("09-02-2018", "MM-DD-YYYY");;
  public currentScrollPos = 0;
  public prevScrollPos = 0;
  public date = moment();
  public showDaySessions: Boolean = true;
  public showMonthSessions: Boolean = false;
  public selectedDate = this.date;
  public traversedMonth = moment();
  public daysArray;
  public dayHourlySchedule;
  public weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  public todayDate = moment();
  public initScrollToPresent = false;
  public firstDayOfMonthListInfinite = [this.todayDate];
  constructor(public navCtrl: NavController) {

  }

  public toggleMonth(){
    this.showMonthSessions = !this.showMonthSessions;
    if(this.showMonthSessions){
      this.scrollMonthBy("div#sec-"+this.selectedDate.format('MMMM')+"-"+this.selectedDate.format('YYYY'));
    }
    else if(!this.showMonthSessions){
      this.scrollMonthBy('div.selected-date');
    }
  }

  public scrollMonthBy(str){
    $( "div#testId" ).scrollTop( $( str )[0].offsetTop - 60);
  }

  public scrollCalendar() {
    console.log('in scrollCalendar');
    if(!this.initScrollToPresent){
      this.scrollMonthBy("div.today");
      this.initScrollToPresent = true;
    }
    let scrollHeight = $('#testId')[0].scrollHeight;
    let scrolledPx = $('#testId')[0].scrollTop;

    if((scrollHeight - scrolledPx) <500){
      this.addNextMonthsToLongCalendar(12*2);
    }
    else if(scrolledPx < 500){
      this.addPrevMonthsToLongCalendar(12*2);
    }
  }

    // if(!this.initScrollToPresent){
    //   $( "div#testId" ).scrollTop( $( "div#sec-"+ moment().format('MMMM')+"-"+moment().format('YYYY') )[0].offsetTop - 80);
    //   this.initScrollToPresent = true;
    // }
    
    // let scrollHeight = $('#testId')[0].scrollHeight;
    // let scrolledPx = $('#testId')[0].scrollTop;

    // if((scrollHeight - scrolledPx) <500){
    //   this.addNextMonthsToLongCalendar(12*2);
    // }
    // else if(scrolledPx < 500){
    //   this.addPrevMonthsToLongCalendar(12*2);
    // }

  

  public ngOnInit(){
    this.daysArray = this.createCalendar(this.date);
    this.getHourTimeLine();
    this.addNextMonthsToLongCalendar(12*2);
    this.addPrevMonthsToLongCalendar(12*2);
    let self = this;
    setTimeout(function(){
      console.log('jhjh');
      self.scrollCalendar();
    },1000);
  }

  public todayCheck(day){
    if(!day){
      return false;
    }
    return moment().format('L') === day.format('L');
  }

  public addNextMonthsToLongCalendar(n){
    for(let i = 1; i <= n; i++){
      this.firstDayOfMonthListInfinite.push(moment(this.firstDayOfMonthListInfinite[this.firstDayOfMonthListInfinite.length-1].format()).add(1,'M'));
    }
    
  }

  public addPrevMonthsToLongCalendar(n){
    for(let i = 1; i <= n; i++){
      this.firstDayOfMonthListInfinite.unshift(moment(this.firstDayOfMonthListInfinite[0].format()).subtract(1,'M'));
    }
    
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
    // console.log(this.dayHourlySchedule);
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
    this.showMonthSessions = true;

      this.scrollMonthBy("div#sec-"+this.selectedDate.format('MMMM')+"-"+this.selectedDate.format('YYYY'));
  }

  public selectedCheck(date){
    if(!date){
      return false;
    }
    return this.selectedDate.format('L') === date.format('L');
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

  public getWeekDays(){
    let days = [];
    for(let n = 0;n<7;n++){
      days.push(moment(this.selectedDate.format()).add(n-this.selectedDate.weekday(),'d'));
    }
    return days;
  }

}
