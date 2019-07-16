import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  constructor(private apiservice: ApiserviceService,private spinner:NgxSpinnerService) { }
public topTen=[];
  ngOnInit() {
    this.getTeamData();
    this.spinner.show();
  }

  getTeamData(){
    this.apiservice.getTopTeams().subscribe((data:[]) => {
      this.spinner.hide();
      if (data) {
     console.log("data",data);
     this.topTen=data;
      }
    })
  }



}
