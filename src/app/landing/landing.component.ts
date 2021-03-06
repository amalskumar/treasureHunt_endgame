import { Component, OnInit, NgZone  } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { GamepanelComponent } from 'app/gamepanel/gamepanel.component';
import{DataserviceService} from 'app/dataservice.service'
export interface DialogData {
  countrySelected:string;
}
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
 
flag:boolean=false;
originalCountry: any ='INDIA';
  
  countrySelected;


  constructor(private _ngZone: NgZone,public dialog: MatDialog,private dataService:DataserviceService) { 
    window["angularComponent"] = this;
 
  }

  ngOnInit() {
  

  }
  showPopup(){
    this.countrySelected=window["country"];
if(this.originalCountry==this.countrySelected)
    this.openDialog();
  }

  // runThisFunctionFromInside(){

  //   this.country=window["country"];
  //   console.log("country selected", this.country);
  //   if(this.flag==false){
  //     this.flag=true;
  //     this.openDialog();
  //   } 
  //   return true
  // }
 
  openDialog(): void {
    const dialogRef = this.dialog.open(GamepanelComponent, {
      width: '90%',
      data: {countrySelected: this.countrySelected}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
