import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { Points } from 'app/claimpoint/foundstone/foundstone.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    public snap = false;
    public teamData: Points;
    username;
    isLoggedIn = false;
    constructor(private router: Router,public location: Location,
        private element: ElementRef,
        private adalSvc: MsAdalAngular6Service,) { 
            this.isLoggedIn = this.adalSvc.isAuthenticated;
        }

    ngOnInit() {
       
    }

  
    register() {
        this.router.navigate(['/signup'])
    }
}
