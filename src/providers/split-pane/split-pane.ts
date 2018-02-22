import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SplitPaneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SplitPaneProvider {
  splitPaneState : boolean;
  constructor(public http: HttpClient) {
    this.splitPaneState = false;
    console.log('Hello SplitPaneProvider Provider');
  }
  getSplitPane() {
    if (localStorage.getItem('userData')) {

      this.splitPaneState = true;
    } else {
      this.splitPaneState = false;
    }
    return this.splitPaneState;
  }

}
