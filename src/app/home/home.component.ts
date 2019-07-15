import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataserviceService } from 'app/dataservice.service';
import { ApiserviceService } from 'app/services/apiservice.service';
export class Login {
    email: string;
    token: string;
  }
  
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


    public loginData: Login;
    isLoggedIn = false;
    userName: any;
    userEmail: string;
    token: string;
    constructor(private router: Router, public location: Location,
        private element: ElementRef,
        private adalSvc: MsAdalAngular6Service,
        private spinner: NgxSpinnerService, 
        private apiservice: ApiserviceService,
        private dataService: DataserviceService) {
            this.loginData = new Login();
            this.isLoggedIn = this.adalSvc.isAuthenticated;
            this.userName = this.adalSvc.LoggedInUserName;
            this.userEmail = this.adalSvc.LoggedInUserEmail;
            this.token = this.adalSvc.accessToken;
            this.checkLogin();
    }

    ngOnInit() {

    }
    checkLogin() {
        if (this.isLoggedIn) {
          console.log("logged in")
          this.loginUser();
        } else {
          this.adalSvc.login();
        }
      }


      loginUser() {

        if (!this.dataService.getItem()) {
          this.loginData.email = this.userEmail;
          this.loginData.token = this.token.substr(0, 128);
          this.apiservice.login(this.loginData).subscribe((data: Points) => {
            if (data) {
              this.dataService.setItem(data);
             //do 
            } else {
              this.adalSvc.logout();
            }
          })
        } else {
            
        }
      }

}
