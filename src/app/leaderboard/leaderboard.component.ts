import { DataserviceService } from './../dataservice.service';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/services/apiservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeamData, Points } from 'app/shared/models/endgame-models';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  public topTen = [];
  teamData: TeamData;
  public teamPoints: Points;
  constructor(private apiservice: ApiserviceService, private spinner: NgxSpinnerService, private dataService: DataserviceService) {
    this.teamData = new TeamData();
    this.teamPoints = new Points();
    this.getMyTeamDetails();
  }

  ngOnInit() {
    this.getTeamData();
    this.spinner.show();
  }

  getTeamData() {
    this.apiservice.getTopTeams().subscribe((data: []) => {
      this.spinner.hide();
      if (data) {
        this.topTen = data;
      }
    })
  }

  getMyTeamDetails() {
    this.apiservice.getTeamDetails().subscribe((data: TeamData) => {
      if (data) {
        this.teamData = data;
        this.getTeamPoints()
      }
    });
  }

  getTeamPoints() {
    if (this.dataService.getItem()) {
      this.teamPoints = this.dataService.getItem();
    }
  }

}
