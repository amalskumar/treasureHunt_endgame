import { NgxSpinnerService } from 'ngx-spinner';
import { Points, Login } from './../login/login.component';
import { ApiserviceService } from 'app/services/apiservice.service';
import { DataserviceService } from './../../dataservice.service';
import { Component, OnInit, ElementRef,  } from '@angular/core';
import { Location,} from '@angular/common';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Response } from '../models/endgame-models';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public teamData: Points;
    isLoggedIn = false;
    userName: any;
    userEmail: string;
    token: string;
    public loginData: Login;

    
    constructor(public location: Location,
        private element: ElementRef,
        private dataService: DataserviceService,
        private adalSvc: MsAdalAngular6Service,
        private apiservice: ApiserviceService,
        private spinner: NgxSpinnerService
    ) {
        this.loginData = new Login();
        this.isLoggedIn = this.adalSvc.isAuthenticated;
        this.userName = this.adalSvc.LoggedInUserName;
        this.userEmail = this.adalSvc.LoggedInUserEmail;
        this.token = this.adalSvc.accessToken;
        this.isLoggedIn = this.adalSvc.isAuthenticated;
        this.sidebarVisible = false;
        this.teamData = new Points();
        this.checkLogin();
    }


    ngOnInit() {
     

        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        if (this.adalSvc.isAuthenticated) {
            this.userName = this.adalSvc.LoggedInUserName;

            this.dataService.itemValue.subscribe((data: Points) => {
                if (data) {
                    this.teamData = data;
                }
            });
            this.setData();
        }
    }

    setData() {
        if (this.dataService.getItem()) {
            this.teamData = this.dataService.getItem();
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === 'home') {
            return true;
        }
        else {
            return false;
        }
    }
    isPlay() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === 'game') {
            return true;
        }
        else {
            return false;
        }
    }

    logout() {
        this.spinner.show();
        this.dataService.removieItem();
        this.apiservice.logout().subscribe((data: Response) =>{
            if(data){
                if(data.status=='Success'){
                    this.spinner.hide();
                    this.adalSvc.logout();
                }else {
                    this.spinner.hide();
                }
            }
        });
    }

    login() {
        this.adalSvc.login();
    }

    redirectToPlay() {
        window.location.href = 'game';
    }

    rules() {
        window.location.href = 'rules';
    }

    home() {
        window.location.href = 'home';
    }

    leaderboard() {
        window.location.href = 'leaderboard';
    }

    trivia(){
        window.location.href = 'trivia';
    }

    updatePoints() {
        this.apiservice.updateScore().subscribe((data: Points) => {
            if (data) {
                this.dataService.setItem(data);
            }
        })
    }

    checkLogin() {
        if (this.isLoggedIn) {
            this.loginUser();
        } else {
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
        } else {
            
        }
    }


}
