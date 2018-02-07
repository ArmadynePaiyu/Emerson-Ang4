import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './model/model';
import { LocalService } from "./localService";
import { ENV } from '@app/env'

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private localService: LocalService) {

        console.log('AuthService Provider');
    }

    login(user: User) {

        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers = headers.append("Content-Type", 'application/json');
            headers = headers.append("Authorization", 'Basic ' + user.encrypt);
            headers = headers.append("oracle-mobile-backend-id", ENV.loginBackEndId);

            console.log("LOGIN REQUEST", headers);

            console.log("START LOGIN", new Date());

            this.http
                .get<User>(ENV.apiUrl + 'login_API/verify_login', { headers: headers })
                .subscribe(response => {

                    console.log("END LOGIN", new Date());

                    console.log("LOGIN RESPONSE", response);

                    this.technicianProfile(response.ID, user).then(response => {

                        resolve(response);

                    }, error => {

                        reject(error);
                    });

                }, (error: HttpErrorResponse) => {

                    console.error("LOGIN ERROR", error);

                    reject(error);
                });
        });
    };

    technicianProfile(resourceId, userObject: User) {

        return new Promise((resolve, reject) => {

            let params = new HttpParams();
            params = params.append("resourceId", resourceId);

            let headers = new HttpHeaders();
            headers = headers.append("Content-Type", 'application/json');
            headers = headers.append("Authorization", ENV.authKey);
            headers = headers.append("oracle-mobile-backend-id", ENV.techBackEndId);

            console.log("START TECHNICIAN", new Date());

            this.http
                .get<any>(ENV.apiUrl + 'Technician_Profile_Details/to_get_techpro', { headers: headers, params: params })
                .subscribe(res => {

                    console.log("TECHNICIAN RESPONSE", res);

                    var response = res.technicianProfile[0];

                    let user: User = new User();

                    user.ID = response.ID;
                    user.ClarityID = response.ClarityID;
                    user.Currency = response.Currency;
                    user.Default_View = response.Default_View;
                    user.Email = response.Email;
                    user.Language = response.Language;
                    user.Name = response.Name;
                    user.OFSCId = response.OFSCId;
                    user.Password = response.Password;
                    user.Time_Zone = response.Time_Zone;
                    user.Type = response.Type;
                    user.User_Name = response.User_Name;
                    user.Work_Day = response.Work_Day;
                    user.Work_Hour = response.Work_Hour;
                    user.Login_Status = "1";
                    user.Sync_Status = "0";
                    user.Last_Updated = new Date() + "";
                    user.Last_Updated_Internal = new Date() + "";
                    user.Last_Updated_Delete = new Date() + "";
                    user.encrypt = userObject.encrypt;
                    user.userName = userObject.userName;

                    this.localService.insertUserList(user).then(response => {

                        console.log("END TECHNICIAN", new Date());

                        resolve(response);

                    }, error => {

                        reject(error);
                    });

                }, (error: HttpErrorResponse) => {

                    console.error("TECHNICIAN ERROR", error);

                    reject(error);
                });
        });
    };
}