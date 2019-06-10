import { Component, OnInit, NgZone  } from '@angular/core';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor(private _ngZone: NgZone) { 
    window["angularComponent"] = this
  }

  ngOnInit() {}
  runThisFunctionFromInside(country){
    console.log("country selected",country);
  }

  

}
