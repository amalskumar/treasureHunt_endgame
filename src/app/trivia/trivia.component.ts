import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/services/apiservice.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  public startTrivia: boolean = true;
  public activeQuestion;
  public index;
  isLoggedIn;
  triviaForm: FormGroup;

  public QuesOver: boolean = false;
  public trivia: ITrivia[] = [];
  constructor(private api: ApiserviceService, private adalSvc: MsAdalAngular6Service, private formBuilder: FormBuilder, ) {
    // this.isLoggedIn = this.adalSvc.isAuthenticated;
    // this.checkLogin();
    this.getTrivia();
  }

  ngOnInit() {
    this.triviaForm = this.formBuilder.group({
      optradio: ['', Validators.required],
    })
  }
  // checkLogin() {
  //   if (this.isLoggedIn) {
  //     this.startTriviaafterLogin();
  //   } else {
  //     this.adalSvc.login();
  //   }
  // }


  startTriviaafterLogin() {
    this.startTrivia = !this.startTrivia;
    this.index = 0;
    this.showNextQuestion();
  }
  onFinished() {
    this.showFinish();
  }

  playTrivia() {
    this.startTrivia = !this.startTrivia;
  }
  showFinish() {
    this.QuesOver = true;
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
    }
  }
  optionSelected(selectedOption) {
    this.trivia[this.index - 1].selectedChoice = selectedOption;
  }

  getTrivia() {
    this.api.getTrivia().subscribe((data: ITrivia[]) => {
      if (data) {
        this.trivia = data;
        this.startTriviaafterLogin();
      }
    });
  }

  postTrivia() {

  }



}

