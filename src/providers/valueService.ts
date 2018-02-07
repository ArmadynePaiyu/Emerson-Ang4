import { Injectable } from '@angular/core';
import { User, Task, TaskDetail } from "./model/model";

import { LocalService } from "./localService";
import { CloudService } from "./cloudService";
import { ConstantService } from "./constantService";

@Injectable()
export class ValueService {

    futureTask;

    constructor(private cloudService: CloudService, private localService: LocalService, private constantService: ConstantService) {

        console.log('ValueService Provider');
    }

    fetchData(isLogin) {

        return new Promise((resolve, reject) => {

            this.cloudService.getTaskList(isLogin).then(response => {

                resolve(true);

            }, error => {

            });
        });
    };

    offlineLogin(user: User) {

        return new Promise((resolve, reject) => {

            this.localService.getDatabaseState().subscribe(ready => {

                if (ready) {

                    this.localService.getUser(user).then(response => {

                        if (response.length > 0) {

                            let userObject: User = new User();

                            userObject.ID = response[0].ID;

                            userObject.Login_Status = "1";

                            this.localService.updateLoginStatus(userObject).then(response => {

                                this.setUserTask().then(response => {

                                    resolve(true);

                                }, error => {

                                    reject(false);
                                });

                            });

                        } else {

                            console.error("NOT A VALID USER");

                            reject(false);
                        }

                    });

                } else {

                    console.error("DB NOT READY");
                }
            });
        });
    };

    setUserTask() {

        return new Promise((resolve, reject) => {

            this.localService.getUserList().then(response => {

                if (response.length > 0) {

                    response.forEach((item: User) => {

                        if (item.Login_Status == "1") {

                            this.constantService.currentUser = item;
                        }
                    });

                    if (this.constantService.currentUser.ID !== null) {

                        this.localService.getTaskList().then((response: Task[]) => {

                            this.localService.getInternalList().then(internalresponse => {

                                internalresponse.forEach(item => {

                                    var internalObject: Task = new Task();

                                    internalObject.Start_Date = item.Start_time;
                                    internalObject.End_Date = item.End_time;
                                    internalObject.Type = "INTERNAL";
                                    internalObject.Customer_Name = item.Activity_type;
                                    internalObject.Task_Number = item.Activity_Id;

                                    response.push(internalObject);
                                });

                                this.constantService.currentTaskList = response;

                                resolve(true);
                            });
                        });

                    } else {

                        console.error("INVALID USER DATA");

                        reject(false);
                    }

                } else {

                    console.error("USER LIST EMPTY");

                    reject(false);
                }

            }, error => {

                console.error("GET USER LIST ERROR", error);

                reject(false);
            });
        });
    };

    setIfFutureDateTask(value: any): void {
        this.futureTask = value;
    };

    getIfFutureDateTask(): any {
        return this.futureTask;
    };

    checkIfFutureDayTask(selTask: TaskDetail): boolean {

        var currDate = new Date;

        var selDate = new Date(selTask.Start_Date.split(" ")[0]);

        // console.log(currDate);
        //
        // console.log(selDate);

        if (selDate.getFullYear() > currDate.getFullYear()) {

            return true;

        } else if (selDate.getFullYear() === currDate.getFullYear()) {

            if (selDate.getMonth() > currDate.getMonth()) {

                return true;

            } else if (selDate.getMonth() === currDate.getMonth()) {

                if (selDate.getDate() > currDate.getDate()) {

                    return true;
                }
            }
        }

        return false;
    };

    setTask(taskObject: TaskDetail, callback: any) {
        callback("success")
    };

}

