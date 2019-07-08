import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/services/apiservice.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

export interface ITrivia{
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
public startTrivia:boolean=true;
public activeQuestion;
public index;
isLoggedIn;
public QuesOver:boolean=false;
public trivia: ITrivia[];
  constructor(private api: ApiserviceService,private adalSvc: MsAdalAngular6Service,) {
    // this.isLoggedIn = this.adalSvc.isAuthenticated;
    // this.checkLogin();
   }

  ngOnInit() {
    this.startTriviaafterLogin();
  }
  // checkLogin() {
  //   if (this.isLoggedIn) {
  //     this.startTriviaafterLogin();
  //   } else {
  //     this.adalSvc.login();
  //   }
  // }


  startTriviaafterLogin(){
    this.getTrivia();
    this.startTrivia=!this.startTrivia;
    this.index=0;
    this.showNextQuestion();
  }
  onFinished(){
    this.showFinish();
  }

  playTrivia(){
    this.startTrivia=!this.startTrivia;
  }
  showFinish(){
    this.QuesOver=true;
    console.log("this.trivia",this.trivia);
  }
  showNextQuestion(){

    if(this.trivia.length==this.index){
      this.showFinish();
    }else{
      this.activeQuestion=this.trivia[this.index];
      this.index++;
    }
}
optionSelected(selectedOption){
  this.trivia[this.index-1].selectedChoice=selectedOption;
}
getTrivia(){
//   this.api.getTrivia().subscribe((data: ITrivia[]) =>{
// this.trivia=data;
//   });
this.trivia = [
  { 
    'id': 1,
    'question': "Questio 1",
    'choice1': "choice1",
    'choice2': "choice2",
    'choice3': "choice3",
    'choice4': "choice4",
    'selectedChoice': " "
  },
  { 
    'id': 2,
    'question': "Questio 2",
    'choice1': "choice1",
    'choice2': "choice2",
    'choice3': "choice3",
    'choice4': "choice4",
    'selectedChoice': " "
  },
  { 
    'id': 3,
    'question': "Questio 3",
    'choice1': "choice1",
    'choice2': "choice2",
    'choice3': "choice3",
    'choice4': "choice4",
    'selectedChoice': " "
  }
]
}



}

