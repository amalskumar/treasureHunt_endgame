import { NgxSpinnerService } from 'ngx-spinner';
import { DataserviceService } from './../dataservice.service';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/services/apiservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Response, Points, TriviaResponse } from 'app/shared/models/endgame-models';

export class ITrivia {
  id: number;
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  selectedChoice: string;
}

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit {
  public startTrivia: boolean = false;
  public activeQuestion;
  triviaOpen = false;
  canPlay = false;
  buttonNext=true;
  triviaScore;
  public index;
  isLoggedIn;
  triviaOpenMessage;
  triviaForm: FormGroup;
  message;

  public QuesOver: boolean = false;
  public trivia: ITrivia[] = [];
  constructor(private api: ApiserviceService, 
    private dataService: DataserviceService, 
    private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    private nxgSpinner: NgxSpinnerService) {
    this.isTriviaOpen();
  }

  ngOnInit() {
    this.triviaForm = this.formBuilder.group({
      optradio: ['', Validators.required],
    })
  }


  startTriviaafterLogin() {
    this.index = 0;
    this.showNextQuestion();
  }
  onFinished() {
    this.showFinish();
  }

  playTrivia() {
    this.startTrivia = !this.startTrivia;
   this.getTrivia();
  }

  showFinish() {
    this.QuesOver = true;
    this.postTrivia(this.trivia);
  }

  showNextQuestion() {
    if (this.trivia.length == this.index) {
      this.showFinish();
    } else {
      this.activeQuestion = this.trivia[this.index];
      this.index++;

      if (this.index > 1) {
        this.triviaForm.reset();
      }
      if (this.trivia.length == this.index) {
        this.buttonNext=false;
      }else {
        this.buttonNext=true;
      }

    }
  }

  showPreviousQuestion(){
    if(this.index>1){
      this.index--;
      this.activeQuestion = this.trivia[this.index-1];
      if (this.index > 0) {
        this.triviaForm.reset();
      } if (this.trivia.length == this.index) {
        this.buttonNext=false;
      }else {
        this.buttonNext=true;
      }
    }
  }

  optionSelected(selectedOption) {
    this.trivia[this.index - 1].selectedChoice = selectedOption;
  }

  getTrivia() {
    this.nxgSpinner.show();
    this.api.getTrivia().subscribe((data: ITrivia[]) => {
      if (data) {
        if(data.length!=0){
          console.log(data);
          this.trivia = data;
          this.canPlay = true;
          this.nxgSpinner.hide();
        this.startTriviaafterLogin();
        } else {
        this.canPlay = false;
        this.nxgSpinner.hide();
        }
      }else {
        this.canPlay = false;
        this.nxgSpinner.hide();
      }
    });
  }

  postTrivia(data: ITrivia[]) {
    this.api.postTrivia(data).subscribe((data :TriviaResponse) => {
      if(data) {
        if(data.status == 'Success') {
          this.message = data.message;
          this.triviaScore = data.correctAnswers;
          this.updatePoints();
          this.openSnackBar(data.message, 'Close')
        } else if(data.status == 'Fail'){
          this.openSnackBar(data.message, 'Close')
        } 
      } else {
        this.openSnackBar("Error Occured. Sorry!!", 'Close')
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }

  updatePoints() {
    this.api.updateScore().subscribe((data: Points) => {
        if (data) {
            this.dataService.setItem(data);
        }
    })
}

isTriviaOpen() {
  this.nxgSpinner.show();
  this.api.isTriviaOpen().subscribe((data: Response) => {
    if(data){
      if(data.status == 'Success')
      {
        this.triviaOpen = true;
        this.nxgSpinner.hide();
      } else if(data.status == 'TriviaPlayed'){
        this.triviaOpen = false;
        this.triviaOpenMessage="Team has already played Trivia";
        this.nxgSpinner.hide();
      } else if(data.status == 'Fail'){
        this.triviaOpen = false;
        this.triviaOpenMessage="Marvel Trivia is not avialable at the moment";
        this.nxgSpinner.hide();
        setTimeout(() => {
          window.location.href='home';
        }, 2000);
      }
    }
  })
}

}

