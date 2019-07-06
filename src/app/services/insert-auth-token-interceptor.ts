import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class InsertAuthTokenInterceptor implements HttpInterceptor {

    token;
    name;
    constructor(private adal: MsAdalAngular6Service) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // get api url from adal config
        this.token = this.adal.accessToken;
        this.name = this.adal.LoggedInUserEmail;

        this.token = this.token.substr(0, 128);
        if (!this.adal.isAuthenticated) {
            return next.handle(req);
        } else {
            const authorizedRequest = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `${this.token}`,
                    'Name': `${this.name}`,
                    'TeamName': 'Block Hawks', // get teamname from local storage.
                })
            });
            return next.handle(authorizedRequest);

        }
    }
}
