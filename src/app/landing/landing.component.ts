import { ApiserviceService } from 'app/services/apiservice.service';
import { Question } from './../shared/models/endgame-models';
import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GamepanelComponent } from 'app/gamepanel/gamepanel.component';
import { DataserviceService } from 'app/dataservice.service'
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Router } from '@angular/router';

export interface DialogData {
  questionData: Question;
  countrySelected: string;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  flag: boolean = false;
  originalCountry;

  countrySelected;
  isLoggedIn: boolean;
  questionData: Question;

  constructor(private router: Router, private _ngZone: NgZone, private adalSvc: MsAdalAngular6Service,
    public dialog: MatDialog, private dataService: DataserviceService, private apiservice: ApiserviceService) {
    this.questionData = new Question();
    window['angularComponent'] = this;
    this.isLoggedIn = this.adalSvc.isAuthenticated;
    this.getQuestionUpdate();
  }

  ngOnInit() {
    this.dataService.callValueChange('Call back');
  }

  showPopup() {
    if (this.originalCountry) {
      this.countrySelected = window['country'];
      if (this.originalCountry == this.countrySelected) {
        this.openDialog();
      }
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(GamepanelComponent, {
      width: '90%',
      data: { questionData: this.questionData, countrySelected: this.countrySelected }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getQuestion() {
    this.apiservice.getQuestion().subscribe((data: Question) => {
      if (data) {
        this.questionData = data;
        this.originalCountry = data.country;
      }
    })
  }

  getQuestionUpdate() {
    this.dataService.valueChanged.subscribe(data => {
      this.getQuestion();
    })
  }

}

