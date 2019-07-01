import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit {
public startTrivia:boolean=true;
public activeQuestion;
public index;
public QuesOver:boolean=false;
  constructor() { }

  ngOnInit() {
    this.startTrivia=!this.startTrivia;
    console.log(this.questionArray);
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
  }
  showNextQuestion(){
    if(this.questionArray.questions.length==this.index){
      this.showFinish();
    }else{
      this.activeQuestion=this.questionArray.questions[this.index];
      this.index++;
    }

}


public questionArray={  
  "questions":[  
     {  
        "id":1,
        "question":"Block Hawkswwwwevvvvvvvvvvvvvvvvvvdfvdgfgsfhfghyhyhtytrytrttyetywewe",
        "a":"asd",
        "b":"asd",
        "c":"asd",
        "d":"asd"
     },
     {  
        "id":2,
        "question":"cvvBlock Hawkwewewewewes",
        "a":"aasd",
        "b":"asd",
        "c":"asd",
        "d":"asd"
     },
     {  
        "id":3,
        "question":"vvvvBlocxcxcck Hawkweweweryeryetytyteewewes",
        "a":"aasd",
        "b":"asd",
        "c":"asd",
        "d":"asd"
     }
  ]
};








}
