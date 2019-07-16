import { ApiserviceService } from 'app/services/apiservice.service';
import { Answer, Question, QuestionObject, Response } from './../shared/models/endgame-models';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LandingComponent, DialogData } from 'app/landing/landing.component';
@Component({
  selector: 'app-gamepanel',
  templateUrl: './gamepanel.component.html',
  styleUrls: ['./gamepanel.component.scss']
})
export class GamepanelComponent implements OnInit {

  answerValue;
  desc = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500shanged";
  statusMessage = 'Enter the key to move forward!';
  answer: string;
  answerData: Answer;
  DialogData: QuestionObject;
  ngOnInit() {
  }


  constructor(
    public dialogRef: MatDialogRef<LandingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiservice: ApiserviceService) {

    this.answerData = new Answer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  Submit() {
    this.answerData.answer = this.answerValue;
    this.getTeamData();
    this.apiservice.postAnswer(this.answerData).subscribe((data: Response) => {
      if(data.status == 'Success'){
        this.statusMessage = data.message;
        this.getQuestion();
      } else if (data.status == 'Fail') {
        this.statusMessage = 'You have entered the wrong key. Please try again.'
      }
    });
  }

  getQuestion(){
    this.apiservice.getQuestion().subscribe((data:Question) => {
      this.data.questionData = data;
    })
  }
  
  getTeamData() {
    this.apiservice.getTeamDetails().subscribe(data => {
      console.log(data);
    })
  }
}
