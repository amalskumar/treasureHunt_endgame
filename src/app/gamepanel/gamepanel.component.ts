import { ApiserviceService } from 'app/services/apiservice.service';
import { Answer, Question, QuestionObject, Response, Points } from './../shared/models/endgame-models';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LandingComponent, DialogData } from 'app/landing/landing.component';
import { DataserviceService } from 'app/dataservice.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-gamepanel',
  templateUrl: './gamepanel.component.html',
  styleUrls: ['./gamepanel.component.scss']
})
export class GamepanelComponent implements OnInit {

  answerValue;
  statusMessage = "Enter the secret key to move forward";
  
  answer: string;
  fileLink;
  questionLink;
  
  answerData: Answer;
  DialogData: QuestionObject;
  placeholder = 'Enter Key!'
  ngOnInit() {
    if (!this.data.questionData.canAnswer) {
      this.lostGame();
    } else if(this.data.questionData.keyOpen) {
      this.statusMessage = 'Enter the answer to claim the infinity stone';
      this.placeholder = 'Enter the answer!'
    }
    this.CheckFileHint();
  }

  constructor(
    public dialogRef: MatDialogRef<LandingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiservice: ApiserviceService,
    private dataService: DataserviceService,
    private _snackBar: MatSnackBar) {
    this.answerData = new Answer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  Submit() {

    if(this.answerValue) {
      this.answerData.answer = this.answerValue;
      if (this.data.questionData.canAnswer) {
        this.apiservice.postAnswer(this.answerData).subscribe((data: Response) => {
          if (data.status == 'Success') {
            this.statusMessage = data.message;
            this.openSnackBar(data.message, "Close");
            this.placeholder = 'Enter the answer!'
            this.getQuestion();
          } else if (data.status == 'Fail') {
            this.statusMessage = data.message;
          }
        });
      } else {
        this.lostGame();
       
      }
    
      this.answerValue = '';
    }
 
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
        this.CheckFileHint();
      }
    })
  }

  lostGame() {
    if (!this.data.questionData.canAnswer) {
      this.statusMessage = 'Sorry! You used all your chances..';
      this.placeholder = 'Cant go further';
    }
  }

  getTeamData() {
    this.apiservice.getTeamDetails().subscribe(data => {
    })
  }

  updatePoints() {
    this.apiservice.updateScore().subscribe((data: Points) => {
      if (data) {
        this.dataService.setItem(data);
      }
    })
  }
  
  CheckFileHint() {
    let keyHint = this.data.questionData.keyHint;
    let regExp2 = /(.*):(\d*)\/?(.*)/;
    let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    let hint = this.data.questionData.hint;
    let mainQues = this.data.questionData.question;

    if(regexp.test(keyHint) || regExp2.test(keyHint)) {
      this.fileLink = keyHint;
    } 
    
    if(regexp.test(hint) || regExp2.test(hint)){
      this.fileLink = hint;
    }

    if(regExp2.test(mainQues) || regexp.test(mainQues)){
      this.questionLink = mainQues;
    }
  }

  openHint() {
    let url=this.fileLink;
    window.open(url, '_blank');
  }

  downloadFile() {
    let url = this.data.questionData.url;
    window.open(url, '_blank');
  }

  openMainQuestion() {
    let url = this.questionLink;
    window.open(url, '_blank');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }

}
