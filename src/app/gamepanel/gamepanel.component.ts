import { ApiserviceService } from 'app/services/apiservice.service';
import { Answer, Question } from './../shared/models/endgame-models';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LandingComponent, DialogData } from 'app/landing/landing.component';
@Component({
  selector: 'app-gamepanel',
  templateUrl: './gamepanel.component.html',
  styleUrls: ['./gamepanel.component.scss']
})
export class GamepanelComponent implements OnInit {

  desc = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500shanged";
  answer: string;
  answerData: Answer;
  ngOnInit() {
  }


  constructor(
    public dialogRef: MatDialogRef<LandingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiservice: ApiserviceService) {
    console.log(data);
    this.answerData = new Answer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  Submit() {

    this.answer = document.getElementById('answer').value;
    this.answerData.answer = this.answer;
    this.apiservice.postAnswer(this.answerData).subscribe(data => {
      
    });
  }
}
