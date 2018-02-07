import { Input, SimpleChanges, Component, OnChanges } from '@angular/core';
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
  @Input()
  view: any = 'week';
  calendarOptions :Options;
  showDayBlockInWeekView: Boolean = false;
  uiCalendar : any;
  weekDays:any[] = [];
  currentMonth : any = moment();
  currentDay : any;
  selectedDate=this.currentMonth.format('DD/MM/YYYY');
  status: any;
  currentEvent: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiService : ApiProvider) {
    this.uiCalendar = this.frameCalendar();
    this.generateTimeSlots();    
    this.setWeekDays();
  }
  
  generateTimeSlots(){
    this.currentDay = {slots :[],eventOccurence: false,eventLoading:false};
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
    this.updateDate(this.currentMonth);
  }

  nextMonth(){
    this.currentMonth = this.currentMonth.add(1, 'months');
    this.uiCalendar =  this.frameCalendar();
    this.updateDate(this.currentMonth);
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
          if(self.uiCalendar && self.uiCalendar[week]){        
            self.uiCalendar[week].days[l].event = ar.length;
          }
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
      this.currentEvent = {};
      let self = this;
      let keys = Object.keys(event);
      keys.forEach((e)=>{
        console.log(event.e); 
        if(event[e]){
          if(["Start_Date","End_Date","Date"].indexOf(e)>=0){
            event[e] = moment(event[e]).format("DD/MM/YYYY, h:mm:ss a");
          }
          self.currentEvent[e] = event[e];
        }
      });
      console.log('finally: ', this.currentEvent);
    }
    updateDate(event){
      this.showDayBlockInWeekView = true;
      if(event.year()!=this.currentMonth.year() || event.month()!=this.currentMonth.month()){        
        this.currentMonth = event;
        this.uiCalendar = this.frameCalendar();
      }      
      this.currentMonth = event;
      this.setWeekDays();
      this.currentEvent = {};
      this.generateTimeSlots();
      let self = this;
      this.selectedDate = moment(event).format("DD/MM/YYYY");
      this.currentDay.eventLoading = true;
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
          self.currentDay.eventOccurence = true;
        }
        else{
          self.currentDay.eventOccurence = false;
        }
        self.currentDay.eventLoading = false;
      });
    }

  setWeekDays(){
    this.weekDays = [];
    for (var l = 0; l < 7; l++) {
      let day = moment(this.currentMonth).startOf('week').clone().add(l, 'day');
      this.weekDays.push(day);
    }
  }
  changeWeek(d){
    this.showDayBlockInWeekView = false;
    let setCalendarMonth = (this.currentMonth.clone().add(d,'day').month() != this.currentMonth.month());
    this.currentMonth.add(d,'day');
    this.setWeekDays();
    if(setCalendarMonth){      
      this.uiCalendar =  this.frameCalendar();
    }
  }
  openDayInWeek(w){
    this.updateDate(w);
  }
  closeDayInWeek(w){
    this.showDayBlockInWeekView = false;
  }
  dataChanged(e){
    if(e === 'week'){
      this.setWeekDays();
    }
    else if(e === 'day'){
      console.log(moment());
    }
  }
  goTodateView(w){
    this.updateDate(w);
    this.view = "day";
  }
  goToDebrief(task){
    console.log('task : ' , task);
  }
  onclickOfTask(task){
    console.log('task : ' , task);
  }
}
