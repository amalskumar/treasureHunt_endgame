import { Points } from './../shared/login/login.component';
import { DataserviceService } from './../dataservice.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class InsertAuthTokenInterceptor implements HttpInterceptor {

    token;
    name;
    teamData: Points;
    constructor(private adal: MsAdalAngular6Service, private dataService: DataserviceService) {
        this.teamData = new Points();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.adal.isAuthenticated) {
            return next.handle(req);
        } else {
            this.token = this.adal.accessToken;
            this.name = this.adal.LoggedInUserEmail;
            this.token = this.token;
            if (this.dataService.getItem()) {
                this.teamData = this.dataService.getItem();
            }else {
                this.teamData.teamName = '';
            }
            const authorizedRequest = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.token}`,
                    'Name': `${this.name}`,
                    'TeamName': `${this.teamData.teamName}`, // get teamname from local storage.
                })
            });
            return next.handle(authorizedRequest);

        }
    }
}
