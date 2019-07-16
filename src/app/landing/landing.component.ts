import { ApiserviceService } from 'app/services/apiservice.service';
import { Question } from './../shared/models/endgame-models';
import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GamepanelComponent } from 'app/gamepanel/gamepanel.component';
import { DataserviceService } from 'app/dataservice.service'
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Router } from '@angular/router';

export interface DialogData {
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
    this.getQuestion();
  }

  ngOnInit() {


  }

  showPopup() {
    this.countrySelected = window['country'];
    if (this.originalCountry == this.countrySelected) {
      this.openDialog();
    }
  }

  // runThisFunctionFromInside(){

  //   this.country=window['country'];
  //   console.log('country selected', this.country);
  //   if(this.flag==false){
  //     this.flag=true;
  //     this.openDialog();
  //   } 
  //   return true
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(GamepanelComponent, {
      width: '90%',
      data: { countrySelected: this.countrySelected, QuestionData: this.questionData }
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
        console.log(data);
      }
    })
  }

}

