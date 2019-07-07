import { ApiserviceService } from 'app/services/apiservice.service';
import { Points } from 'app/claimpoint/foundstone/foundstone.component';
import { DataserviceService } from './../../dataservice.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public teamData: Points;
    username;
    isLoggedIn = false;

    constructor(public location: Location,
        private element: ElementRef,
        private dataService: DataserviceService,
        private adalSvc: MsAdalAngular6Service,
        private apiservice: ApiserviceService
    ) {
        this.isLoggedIn = this.adalSvc.isAuthenticated;
        this.sidebarVisible = false;
        this.teamData = new Points();
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        if (this.adalSvc.isAuthenticated) {
            this.username = this.adalSvc.LoggedInUserName;
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
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isClaimGift() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '/claim-stone') {
            return true;
        }
        else {
            return false;
        }
    }
    isClaimpoint() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '/claimpoint/:id') {
            return true;
        }
        else {
            return false;
        }
    }

    logout() {
        this.dataService.removieItem();
        this.dataService.removeClaimPointID();
        this.apiservice.logout();
        this.adalSvc.logout();
    }
}
