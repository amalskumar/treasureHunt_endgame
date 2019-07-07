import { Router } from '@angular/router';
import { IStatus, Stone } from './../../dataservice.service';
import { ApiserviceService } from './../../services/apiservice.service';
import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../dataservice.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

export class Login {
  email: string;
  token: string;
}

export class Points {
  teamName: string;
  points: number;
}

@Component({
  selector: 'app-foundstone',
  templateUrl: './foundstone.component.html',
  styleUrls: ['./foundstone.component.scss']
})
export class FoundstoneComponent implements OnInit {

  claimedStone: Stone;
  public loginData: Login;
  isLoggedIn;
  userName;
  userEmail;
  token;
  stoneSuccess = false;
  stoneMessage;


  constructor(private datastore: DataserviceService,
    private adalSvc: MsAdalAngular6Service,
    private apiservice: ApiserviceService,
    private dataService: DataserviceService,
    private router: Router) {
    this.loginData = new Login();
    this.claimedStone = new Stone();
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
      this.loginUser();
      this.getClaimPointID();

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
        } else {
          this.adalSvc.logout();
        }
      })
    }
  }

  getClaimPointID() {
    if (this.dataService.getcliamPointID()) {
      this.claimedStone = this.dataService.getcliamPointID();
      console.log(this.claimedStone);
      this.claimStone(this.claimedStone.id);
    } else {
      this.router.navigate(['/home']);
    }
  }

  claimStone(id) {
    this.apiservice.claimStone(id).subscribe((data: IStatus) => {
      if (data.status == 'Success') {
        this.stoneSuccess = true;
        this.stoneMessage = data.message;
        this.apiservice.updateScore().subscribe((point: Points) => {
          if (null != point.teamName) {
            this.dataService.setItem(point);
          }

        })
      } else if (data.status == 'Fail') {
        this.stoneSuccess = false;
        this.stoneMessage = data.message;
      } else {
        this.router.navigate(['/home']);
      }
    });
    this.dataService.removeClaimPointID();
  }

}