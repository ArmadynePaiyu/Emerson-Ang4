import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ConstantService } from "./constantService";

import { User, Task, Notes, Attachments, Time, Expense, Material, NotesDebrief, TaskName } from './model/model';

@Injectable()
export class LocalService {

    database: SQLiteObject;

    private databaseReady: BehaviorSubject<boolean>;

    constructor(private http: HttpClient, private platform: Platform, private storage: Storage, private sqlite: SQLite, private sqlitePorter: SQLitePorter, private constantService: ConstantService) {

        console.log('LocalService Provider');

        this.databaseReady = new BehaviorSubject(false);

        this.platform.ready().then(() => {

            this.sqlite.create({
                name: 'emerson.db',
                location: 'default'
            }).then((db: SQLiteObject) => {

                this.database = db;

                this.storage.get('database_filled').then(flag => {

                    console.log("DATABASE CREATED " + flag);

                    if (flag) {
                        this.databaseReady.next(true);
                    } else {
                        this.createDatabase();
                    }
                });
            });
        });
    };

    createDatabase() {

        this.http
            .get('assets/data.sql', { responseType: 'text' })
            .subscribe(sql => {

                console.log("CREATE DATABASE SQL ", sql);

                this.sqlitePorter
                    .importSqlToDb(this.database, sql)
                    .then(data => {

                        console.log("CREATE DATABASE SUCCESS", data);

                        this.databaseReady.next(true);

                        this.storage.set('database_filled', true);

                        return Promise.resolve(data);
                    })
                    .catch(error => {

                        console.error("CREATE DATABASE ERROR", error);

                        return Promise.resolve(error);
                    });
            });
    };

    getDatabaseState() {
        return this.databaseReady.asObservable();
    };

    insertUserList(insertObject: User) {

        return new Promise(resolve => {

            let insertValues = [];

            let query = "INSERT OR REPLACE INTO User VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            insertValues.push(insertObject.ID);
            insertValues.push(insertObject.ClarityID);
            insertValues.push(insertObject.Currency);
            insertValues.push(insertObject.Default_View);
            insertValues.push(insertObject.Email);

            insertValues.push(insertObject.Language);
            insertValues.push(insertObject.Name);
            insertValues.push(insertObject.OFSCId);
            insertValues.push(insertObject.Password);
            insertValues.push(insertObject.Time_Zone);

            insertValues.push(insertObject.Type);
            insertValues.push(insertObject.User_Name);
            insertValues.push(insertObject.Work_Day);
            insertValues.push(insertObject.Work_Hour);
            insertValues.push(insertObject.Login_Status);
            insertValues.push(insertObject.Sync_Status);
            insertValues.push(insertObject.Last_Updated);
            insertValues.push(insertObject.Last_Updated_Task);
            insertValues.push(insertObject.Last_Updated_Internal);
            insertValues.push(insertObject.Last_Updated_Task_Detail);
            insertValues.push(insertObject.Last_Updated_Project);
            insertValues.push(insertObject.Last_Updated_LOV);
            insertValues.push(insertObject.Last_Updated_SR);
            insertValues.push(insertObject.Last_Updated_Delete);
            insertValues.push(insertObject.encrypt);
            insertValues.push(insertObject.userName);

            this.database.executeSql(query, insertValues).then(data => {

                console.log("INSERT USER DATA", data);

                resolve(data);

            }, error => {

                console.error("INSERT USER ERROR", error);

                resolve(false);
            });
        });
    };

    updateLoginStatus(user: User) {

        return new Promise(resolve => {

            let insertValues = [];

            let query = "UPDATE User SET Login_Status = ?  WHERE ID = ?";

            insertValues.push(user.Login_Status);
            insertValues.push(user.ID);

            this.database.executeSql(query, insertValues).then(data => {

                console.log("UPDATE LOGIN STATUS DATA", data);

                resolve(data);

            }, error => {

                console.error("UPDATE LOGIN STATUS ERROR", error);

                resolve(false);
            });
        });
    };

    insertTaskList(responseList: Task[]) {

        return new Promise(resolveList => {

            if (responseList.length > 0) {

                let i = 0;

                responseList.forEach((item: Task) => {

                    new Promise(resolve => {

                        let insertValues = [];

                        let query = "SELECT * FROM Task WHERE Task_Number = ?";

                        insertValues.push(item.Task_Number);

                        this.database.executeSql(query, insertValues).then(data => {

                            let rowLength = data.rows.length;

                            if (rowLength > 0) {

                                this.updateTask(item).then(response => {

                                    resolve(data);

                                    if ((responseList.length - 1) == i) {
                                        resolveList(true);
                                    }

                                    i++;
                                });

                            } else {

                                this.insertTask(item).then(response => {

                                    resolve(data);

                                    if ((responseList.length - 1) == i) {

                                        resolveList(true);
                                    }

                                    i++;
                                });
                            }

                        }, error => {

                            console.error("INSERT TASK ERROR", error);

                            resolve(false);
                        });
                    });
                });

            } else {

                resolveList(true);
            }
        });
    };

    updateTask(insertObject: Task) {

        return new Promise(resolve => {

            let insertValues = [];

            let query = "UPDATE Task SET Job_Description = ?, Duration = ?, Task_Status = ?, Customer_Name = ?, Street_Address = ?, City = ?, State = ?, Country = ?, Zip_Code = ?, Expense_Method = ?, Labor_Method = ?, Travel_Method = ?, Material_Method = ?, Service_Request = ?, Assigned = ?, Start_Date = ?, End_Date = ?, Activity_Id = ?, Work_Phone_Number = ?, Mobile_Phone_Number = ?, Address1 = ?, SR_ID = ?, Name = ?, Contact_Name = ?, ResourceId = ?, Charge_Type = ?, Project_Number = ? WHERE Task_Number = ?";

            insertValues.push(insertObject.Job_Description);
            insertValues.push(insertObject.Duration);
            insertValues.push(insertObject.Task_Status);
            insertValues.push(insertObject.Customer_Name);
            insertValues.push(insertObject.Street_Address);
            insertValues.push(insertObject.City);
            insertValues.push(insertObject.State);
            insertValues.push(insertObject.Country);
            insertValues.push(insertObject.Zip_Code);
            insertValues.push(insertObject.Expense_Method);
            insertValues.push(insertObject.Labor_Method);
            insertValues.push(insertObject.Travel_Method);
            insertValues.push(insertObject.Material_Method);
            insertValues.push(insertObject.Service_Request);
            insertValues.push(insertObject.Assigned);
            insertValues.push(insertObject.Start_Date);
            insertValues.push(insertObject.End_Date);
            insertValues.push(insertObject.Activity_Id);
            insertValues.push(insertObject.Work_Phone_Number);
            insertValues.push(insertObject.Mobile_Phone_Number);
            insertValues.push(insertObject.Address1);
            insertValues.push(insertObject.SR_ID);
            insertValues.push(insertObject.Name);
            insertValues.push(insertObject.Contact_Name);
            insertValues.push(this.constantService.currentUser.ID);
            insertValues.push(insertObject.Charge_Type);
            insertValues.push(insertObject.Project_Number);
            insertValues.push(insertObject.Task_Number);

            this.database.executeSql(query, insertValues).then(data => {

                // console.log("UPDATE TASK DATA", data);

                resolve(data);

            }, error => {

                console.error("UPDATE TASK ERROR", error);

                resolve(false);
            });
        });
    };

    insertTask(insertObject: Task) {

        return new Promise(resolve => {

            let insertValues = [];

            let query = "INSERT INTO Task VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            insertValues.push(insertObject.Task_Number);
            insertValues.push(insertObject.Job_Description);
            insertValues.push(insertObject.Duration);
            insertValues.push(insertObject.Task_Status);
            insertValues.push(insertObject.Customer_Name);
            insertValues.push(insertObject.Street_Address);
            insertValues.push(insertObject.City);
            insertValues.push(insertObject.State);
            insertValues.push(insertObject.Country);
            insertValues.push(insertObject.Zip_Code);
            insertValues.push(insertObject.Expense_Method);
            insertValues.push(insertObject.Labor_Method);
            insertValues.push(insertObject.Travel_Method);
            insertValues.push(insertObject.Material_Method);
            insertValues.push(insertObject.Service_Request);
            insertValues.push(insertObject.Assigned);
            insertValues.push(insertObject.Start_Date);
            insertValues.push(insertObject.End_Date);
            insertValues.push("I");
            insertValues.push(insertObject.Email);
            insertValues.push(insertObject.Date);
            insertValues.push(insertObject.Type);
            insertValues.push(insertObject.Activity_Id);
            insertValues.push(insertObject.Work_Phone_Number);
            insertValues.push(insertObject.Mobile_Phone_Number);
            insertValues.push(insertObject.Address1);
            insertValues.push(insertObject.SR_ID);
            insertValues.push(insertObject.Name);
            insertValues.push(insertObject.Contact_Name);
            insertValues.push(this.constantService.currentUser.ID);
            insertValues.push(insertObject.Charge_Type);
            insertValues.push(insertObject.Project_Number);
            insertValues.push("I");

            this.database.executeSql(query, insertValues).then(data => {

                // console.log("INSERT TASK DATA", data);

                resolve(data);

            }, error => {

                console.error("INSERT TASK ERROR", error);

                resolve(false);
            });
        });
    };

    insertInternalList(responseList: Task[]) {

        return new Promise(resolveList => {

            if (responseList.length > 0) {

                let i = 0;

                responseList.forEach((item: Task) => {

                    new Promise(resolve => {

                        let insertValues = [];

                        let query = "SELECT * FROM Internal WHERE Activity_Id = ?";

                        insertValues.push(item.Activity_Id);

                        this.database.executeSql(query, insertValues).then(data => {

                            let rowLength = data.rows.length;

                            if (rowLength > 0) {

                                this.updateInternal(item).then(response => {

                                    resolve(data);

                                    if ((responseList.length - 1) == i) {
                                        resolveList(data);
                                    }

                                    i++;
                                });

                            } else {

                                this.insertInternal(item).then(response => {

                                    resolve(data);

                                    if ((responseList.length - 1) == i) {
                                        resolveList(data);
                                    }

                                    i++;
                                });
                            }

                        }, error => {

                            console.error("INSERT INTERNAL ERROR", error);

                            resolve(false);
                        });
                    });
                });

            } else {

                resolveList(true);
            }
        });
    };

    updateInternal(insertObject: Task) {

        return new Promise(resolve => {

            let insertValues = [];

            let query = "UPDATE Internal SET Start_time = ?, End_time = ?, Activity_type = ?, Status = ?, ResourceId = ? WHERE Activity_Id = ?";

            insertValues.push(insertObject.Start_time);
            insertValues.push(insertObject.End_time);
            insertValues.push(insertObject.Activity_type);
            insertValues.push(insertObject.Status);
            insertValues.push(this.constantService.currentUser.ID);
            insertValues.push(insertObject.Activity_Id);

            this.database.executeSql(query, insertValues).then(data => {

                // console.log("UPDATE INTERNAL DATA", data);

                resolve(data);

            }, error => {

                console.error("UPDATE INTERNAL ERROR", error);

                resolve(false);
            });
        });
    };

    insertInternal(insertObject: Task) {

        return new Promise(resolve => {

            let insertValues = [];

            let query = "INSERT INTO Internal VALUES (?, ?, ?, ?, ?, ?)";

            insertValues.push(insertObject.Activity_Id);
            insertValues.push(insertObject.Start_time);
            insertValues.push(insertObject.End_time);
            insertValues.push(insertObject.Activity_type);
            insertValues.push(insertObject.Status);
            insertValues.push(this.constantService.currentUser.ID);

            this.database.executeSql(query, insertValues).then(data => {

                // console.log("INSERT INTERNAL DATA", data);

                resolve(data);

            }, error => {

                console.error("INSERT INTERNAL ERROR", error);

                resolve(false);
            });
        });
    };

    updateLastTask(insertObject: User) {

        return new Promise(resolve => {

            let insertValues = [];

            let query = "UPDATE User SET Last_Updated_Task = ? WHERE ID = ?";

            insertValues.push(insertObject.Last_Updated_Task);
            insertValues.push(insertObject.ID);

            this.database.executeSql(query, insertValues).then(data => {

                console.log("UPDATE LAST TASK DATA", data);

                resolve(data);

            }, error => {

                console.error("UPDATE LAST TASK ERROR", error);

                resolve(false);
            });
        });
    };

    getUserList() {

        let query = "SELECT * FROM User";

        return this.database
            .executeSql(query, [])
            .then(data => {

                let dataList = [];

                if (data.rows.length > 0) {

                    for (var i = 0; i < data.rows.length; i++) {

                        dataList.push(data.rows.item(i));
                    }
                }

                console.log("GET USER LIST SUCCESS", dataList);

                return dataList;

            }, error => {

                console.error("GET USER LIST ERROR", error);

                return [];
            });
    }

    getUser(user: User) {

        let query = "SELECT * FROM User WHERE encrypt = ?";

        return this.database
            .executeSql(query, [user.encrypt])
            .then(data => {

                let dataList = [];

                if (data.rows.length > 0) {

                    for (var i = 0; i < data.rows.length; i++) {

                        dataList.push(data.rows.item(i));
                    }
                }

                console.log("GET USER SUCCESS", dataList);

                return dataList;

            }, error => {

                console.error("GET USER ERROR", error);

                return [];
            });
    };

    getTaskList() {

        let query = "SELECT * FROM Task";

        return this.database
            .executeSql(query, [])
            .then(data => {

                let dataList = [];

                if (data.rows.length > 0) {

                    for (var i = 0; i < data.rows.length; i++) {

                        dataList.push(data.rows.item(i));
                    }
                }

                console.log("GET TASK SUCCESS", dataList);

                return dataList;

            }, error => {

                console.error("GET TASK ERROR", error);

                return [];
            });
    }

    getInternalList() {

        var query = "SELECT * FROM Internal";

        return this.database
            .executeSql(query, [])
            .then(data => {

                let dataList = [];

                if (data.rows.length > 0) {

                    for (var i = 0; i < data.rows.length; i++) {

                        dataList.push(data.rows.item(i));
                    }
                }

                console.log("GET INTERNAL SUCCESS", dataList);

                return dataList;

            }, error => {

                console.error("GET INTERNAL ERROR", error);

                return [];
            });
    }

    initializeDataBase() {

        this.http
            .get('assets/taskList.json', { responseType: 'text' })
            .subscribe(data => {

                console.log("DATABASE CREATED ", data);

                this.sqlitePorter
                    .importJsonToDb(this.database, data)
                    .then(data => {

                        console.log("DATABASE CREATED");

                        return Promise.resolve(data);
                    })
                    .catch(error => {

                        console.error(error);

                        return Promise.resolve(error);
                    });
            });
    }

    // createDatabase() {

    //     return this.sqlite.create({
    //         name: 'emerson.sqlite',
    //         location: 'default'
    //     }).then((db: SQLiteObject) => {

    //         return db.executeSql("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, name text)", []).then(res => {
    //             return Promise.resolve(res);
    //         }).catch(e => {
    //             return Promise.resolve(e);
    //         });

    //     }).catch(e => {
    //         return Promise.resolve(e);
    //     });
    // }

    // addItem(i) {
    //     return new Promise(resolve => {
    //       var InsertQuery = "INSERT INTO Todo (todoItem) VALUES (?)";
    //       this
    //         .db
    //         .executeSql(InsertQuery, [i], (r) => {
    //           console.log('Inserted... Sucess..', i);
    //           this
    //             .getRows()
    //             .then(s => {
    //               resolve(true)
    //             });
    //         }, e => {
    //           console.log('Inserted Error', e);
    //           resolve(false);
    //         })
    //     });
    //   }

    addDeveloper(name, skill, years) {

        let data = [name, skill, years];

        return this.database
            .executeSql("INSERT INTO developer (name, skill, yearsOfExperience) VALUES (?, ?, ?)", data)
            .then(data => {
                return data;
            }, err => {
                console.log('Error: ', err);
                return err;
            });
    }

    getAllDevelopers() {

        return this.database
            .executeSql("SELECT * FROM developer", [])
            .then((data) => {

                let developers = [];

                if (data.rows.length > 0) {

                    for (var i = 0; i < data.rows.length; i++) {

                        developers.push({ name: data.rows.item(i).name, skill: data.rows.item(i).skill, yearsOfExperience: data.rows.item(i).yearsOfExperience });
                    }
                }

                return developers;

            }, err => {
                console.log('Error: ', err);
                return [];
            });
    }
}