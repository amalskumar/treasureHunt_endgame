import { ApiserviceService } from 'app/services/apiservice.service';
import { Answer, Question, QuestionObject, Response, Points } from './../shared/models/endgame-models';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LandingComponent, DialogData } from 'app/landing/landing.component';
import { DataserviceService } from 'app/dataservice.service';
@Component({
  selector: 'app-gamepanel',
  templateUrl: './gamepanel.component.html',
  styleUrls: ['./gamepanel.component.scss']
})
export class GamepanelComponent implements OnInit {

  answerValue;
  statusMessage = 'Enter the Secret Key to move forward!';

  answer: string;
  answerData: Answer;
  DialogData: QuestionObject;
  ngOnInit() {
    if (!this.data.questionData.canAnswer) {
      this.lostGame()
    }
  }

  constructor(
    public dialogRef: MatDialogRef<LandingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiservice: ApiserviceService,
    private dataService: DataserviceService) {
    this.answerData = new Answer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  Submit() {
    this.answerData.answer = this.answerValue;
    this.getTeamData();
    this.apiservice.postAnswer(this.answerData).subscribe((data: Response) => {
      if (data.status == 'Success') {
        this.statusMessage = data.message;
        this.getQuestion();
      } else if (data.status == 'Fail') {
        this.statusMessage = 'You have entered the wrong key. Please try again.'
      }
    });
    this.answerValue = '';
  }
  hintClick() {
    this.apiservice.getHint().subscribe((data: Response) => {
      if (data.status == 'Success') {
        this.statusMessage = data.message;
        this.updatePoints();
        this.getQuestion();

      } else if (data.status == 'Fail') {
        this.statusMessage = data.message;
      }
    })
  }
  getQuestion() {
    this.apiservice.getQuestion().subscribe((data: Question) => {
      if (data) {
        this.data.questionData = data;
        this.dataService.callValueChange('Call back');
        if (!this.data.questionData.canAnswer) {
          this.lostGame();
        }
      }
    })
  }

  lostGame() {
    if (!this.data.questionData.canAnswer) {
      this.statusMessage = 'Sorry! You used all your chances..';
    }
  }

  getTeamData() {
    this.apiservice.getTeamDetails().subscribe(data => {
      console.log(data);
    })
  }

  updatePoints() {
    this.apiservice.updateScore().subscribe((data: Points) => {
      if (data) {
        this.dataService.setItem(data);
      }
    })
  }

}
