import { ITrivia } from './../trivia/trivia.component';
import { Answer } from './../shared/models/endgame-models';
import { Login } from './../home/home.component';
import { Stone, DataserviceService } from './../dataservice.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8080';
//const API_URL = 'https://itcdevapp01:8443/endgameapi';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  public stone: Stone;
  constructor(private http: HttpClient) {
    this.stone = new Stone();
  }

  login(user: Login) {
    const body = JSON.stringify(user);
    return this.http.post(`${API_URL}/api/v1/login`, body);
  }

  updateScore() {
    return this.http.get(`${API_URL}/api/v1/points`, httpOptions);
  }

  logout() {
    return this.http.get(`${API_URL}/api/v1/login/logout`, httpOptions);
  }

  getTrivia() {
     return this.http.get(`${API_URL}/api/v1/games/trivia`, httpOptions);
  }

  isTriviaOpen() {
    return this.http.get(`${API_URL}/api/v1/games/isTriviaOpen`, httpOptions);
  }

  postTrivia(trivia: ITrivia[]){
    const body = JSON.stringify(trivia);
    return this.http.post(`${API_URL}/api/v1/games/submitTrivia`, body, httpOptions);
  }

  getHint() {
    return this.http.get(`${API_URL}/api/v1/answer/hint`, httpOptions);

  }
  getQuestion() {
   return this.http.get(`${API_URL}/api/v1/question`, httpOptions);
  }

  postAnswer(answerData: Answer) {
    const body = JSON.stringify(answerData);
    return this.http.post(`${API_URL}/api/v1/answer`, body, httpOptions);
  }

  getTopTeams() {
    return this.http.get(`${API_URL}/api/v1/points/top`, httpOptions);

  }

  getTeamDetails() {
    return this.http.get(`${API_URL}/api/v1/points/myteam`, httpOptions);
  }
}

