import { TaskDetail } from "./model/model";
import { Injectable } from "@angular/core";
import { NavController } from 'ionic-angular';

@Injectable()
export class GlobalService {

    constructor() {

        console.log('GlobalService Provider');
    }

    public showAccept: boolean;
    public showWorkingBtn: boolean;
    public selectedItem: Number;
    public selectedTask: TaskDetail;
    public selectedCategory: String;
    public showTaskDetail: boolean;
    public showDebrief: boolean;
    public completedTask: boolean;
}