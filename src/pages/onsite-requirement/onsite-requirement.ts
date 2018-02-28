import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FieldjobPage } from '../fieldjob/fieldjob';
import { TimePage } from '../time/time';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
/**
 * Generated class for the OnsiteRequirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onsite-requirement',
  templateUrl: 'onsite-requirement.html',
})
export class OnsiteRequirementPage {
  selectedTask;
  notesList;
  noteArray : Array<any> = [];
  attachmentsList;
  attachmentArray;
  defaultTasks = ["1/2 SOCKET", "Cage Retainer Tool", "Power Torque Erench", "Plyers", "3/4 SOCKET"];
  dummyArr = [{"notes":"Cyclinder Replaced due to lekage SR No- 1789R-126"},{"notes":"New Air purifiers were installed"},{"notes":"Patch Update in the PLC System v1.6"}];

  tasks = [];
  constructor(private fileOpener: FileOpener,private file:File,public navCtrl: NavController, public navParams: NavParams, public apiService : ApiProvider) {
    this.selectedTask = this.navParams.get("selTask");
  }

  ionViewDidLoad() {
    this.getNotesForSelectedTask();
    this.getAttachmentsForSelectedTask();
  }
  goToDetails(){

    this.navCtrl.push(FieldjobPage, {"task": this.selectedTask}).then(()=>{
      const startIndex = this.navCtrl.getActive().index - 1;
      this.navCtrl.remove(startIndex, 1);
    });
  }

  getNotesForSelectedTask(){
    this.apiService.getNotes().subscribe(data => {
      this.notesList = data;
      this.notesList.Notes.forEach(element => {
        if(this.selectedTask.Task_Number == element.Task_Number){
          this.noteArray.push(element);
        }
      });
      console.log(this.noteArray);
    })
  }
openAttachment(filename,contentType)
{
  console.log(this.file.applicationDirectory);
  this.fileOpener.open(this.file.applicationDirectory+"/www/assets/"+filename, contentType).then(
    () => console.log('File is opened')
  ).catch(
    (error)=>
    console.log("Cannot Create File " +JSON.stringify(error)))
}
  getAttachmentsForSelectedTask(){
    this.apiService.getAttachments().subscribe(data => {
      this.attachmentsList = data;
      this.attachmentArray = this.attachmentsList.Attachments_Info;
      console.log(this.attachmentArray);
    })
  }
  accept()
  {

  }
  goToDebrief(){
    this.navCtrl.setRoot(TimePage);
  }
}
