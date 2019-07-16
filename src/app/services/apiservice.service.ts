import { Answer } from './../shared/models/endgame-models';
import { Login } from './../home/home.component';
import { Stone, DataserviceService } from './../dataservice.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  public stone: Stone;
  constructor(private http: HttpClient) {
    this.stone = new Stone();
  }

  registerUser(user) {
    const body = JSON.stringify(user);
    // return this.http.post(`https://itcdevapp01:8443/endgameapi/api/v1/register`, body, httpOptions);
    return this.http.post(`http://localhost:8080/api/v1/register`, body, httpOptions);
  }

  login(user: Login) {
    const body = JSON.stringify(user);
    // return this.http.post(`https://itcdevapp01:8443/endgameapi/api/v1/login`, body);
    return this.http.post(`http://localhost:8080/api/v1/login`, body, httpOptions);
  }

  updateScore() {
    // return this.http.get(`https://itcdevapp01:8443/endgameapi/api/v1/points`, httpOptions);
    return this.http.get(`http://localhost:8080/api/v1/points`, httpOptions);
  }

  logout() {
    // return this.http.get(`https://itcdevapp01:8443/endgameapi/api/v1/login/logout`, httpOptions);
    return this.http.get(`http://localhost:8080/api/v1/login/logout`, httpOptions);
  }

  getTrivia() {
    // return this.http.get(`https://itcdevapp01:8443/endgameapi/api/v1/games/trivia`, httpOptions);
    return this.http.get(`http://localhost:8080/api/v1/games/trivia`, httpOptions);
  }
  getHint() {
    // return this.http.get(`https://itcdevapp01:8443/endgameapi/api/v1/answer/hint`, httpOptions);
    return this.http.get(`http://localhost:8080/api/v1/answer/hint`, httpOptions);

  }
  getQuestion() {
     //return this.http.get(`https://itcdevapp01:8443/endgameapi/api/v1/question`, httpOptions);
     return this.http.get(`http://localhost:8080/api/v1/question`, httpOptions);

  }

  postAnswer(answerData: Answer) {
    const body = JSON.stringify(answerData);
    //return this.http.post(`https://itcdevapp01:8443/endgameapi/api/v1/answer`, body, httpOptions);
     return this.http.post(`http://localhost:8080/api/v1/answer`, body, httpOptions);

  }

  getTopTeams() {
    // return this.http.get(`https://itcdevapp01:8443/endgameapi/api/v1/points/top`, httpOptions);
    return this.http.get(`http://localhost:8080/api/v1/points/top`, httpOptions);

  }

  getTeamDetails() {
    // return this.http.get(`https://itcdevapp01:8443/endgameapi/api/v1/points/myteam`, httpOptions);
    return this.http.get(`http://localhost:8080/api/v1/points/myteam`, httpOptions);

  }
}

