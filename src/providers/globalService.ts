import { TaskDetail } from "./model/model";
import { Injectable } from "@angular/core";
import { NavController } from 'ionic-angular';

export class GlobalSharedService
{
   public showAccept:boolean;
   public showWorkingBtn:boolean;
   public selectedItem:Number;
   public selectedTask:TaskDetail;
   public selectedCategory:String;
   public showTaskDetail:boolean;
   public showDebrief:boolean;
   public completedTask:boolean;
   
}