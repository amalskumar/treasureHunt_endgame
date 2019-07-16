import { Router } from '@angular/router';
import { DataserviceService } from 'app/dataservice.service';
import { ApiserviceService } from './../../services/apiservice.service';
import { Component, OnInit } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { NgxSpinnerService } from 'ngx-spinner';

export class Login {
  email: string;
  token: string;
}

export class Points {
  teamName: string;
  points: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginData: Login;
  isLoggedIn;
  userName;
  userEmail;
  token;

  constructor(private adalSvc: MsAdalAngular6Service,
    private spinner: NgxSpinnerService,
    private apiservice: ApiserviceService,
    private dataService: DataserviceService,
    private router: Router) {

  }

  ngOnInit() {
    this.adalSvc.login();
  }
  
}
