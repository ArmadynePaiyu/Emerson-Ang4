import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpensesPage } from '../expenses/expenses';
import { MaterialPage } from '../material/material';
import { NotesPage } from '../notes/notes';
import { EngineerSignaturePage } from '../engineer-signature/engineer-signature';
import { SummaryPage } from '../summary/summary';
import { CustomerSignaturePage } from '../customer-signature/customer-signature';
import { TimePage } from '../time/time';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular/platform/platform';
import { Storage } from '@ionic/storage';

/**
* Generated class for the AttachmentsPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-attachments',
  templateUrl: 'attachments.html',
})
export class AttachmentsPage {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  attachmentFiles:any[]=[];
  attachmentImages:any[]=[];
  constructor(public storage: Storage,public navCtrl: NavController, public navParams: NavParams,private camera: Camera,public plt: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttachmentsPage');
  }
  showCamera()
  {
    console.log("show camera clicked");
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("show camera error "+err);
    });
  }
  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then((response) => {
      //let base64Image = 'data:image/jpeg;base64,'+imageData;
      console.log("jhgk");
    }, (err) => {
      console.log(err);
    });
  }

  public onImageFromStorageChosen(filesEvent: any)
  {
    this.processFileFromStorage(filesEvent,false);
  }
  public onFileFromStorageChosen(filesEvent: any) {
    this.processFileFromStorage(filesEvent,true);
  }

  public processFileFromStorage(event: any,isFile:boolean) {
    let file = event.target.files[0];
    if(file!=undefined)
    {
      if(isFile)
      {
        this.attachmentFiles.push(file);
      }
      else
      {

        this.readfile(file);
      }
      //you can read various properties of the file (like mimetype and size) from the file object.
      console.log(file);
    }

  }
  public readfile(file: any): void {
    if(file!=undefined)
    {
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataUrl = reader.result;
        let fileObj:any={};
        fileObj.name=file.name;
        fileObj.base64=dataUrl;
        this.attachmentImages.push(fileObj);

        //and do something with the reader.
      };
      reader.readAsDataURL(file);
    }
  }

  goToTime(){
    this.navCtrl.setRoot(TimePage);
  }

  goToExpense(){
    this.navCtrl.setRoot(ExpensesPage);
  }

  goToMaterial(){
    this.navCtrl.setRoot(MaterialPage);
  }

  goToNotes(){
    this.navCtrl.setRoot(NotesPage);
  }

  goToAttachments(){
    this.navCtrl.setRoot(AttachmentsPage);
  }

  goToEngineerSignature(){
    this.navCtrl.setRoot(EngineerSignaturePage);
  }

  goToSummary(){
    this.navCtrl.setRoot(SummaryPage);
  }

  goToCustomerSignature(){
    this.navCtrl.setRoot(CustomerSignaturePage);
  }
}
