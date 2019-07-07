import { Stone } from './../dataservice.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'app/claimpoint/foundstone/foundstone.component';
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
    // return this.http.post(`https://endgame.world/endgameapi/api/v1/register`, body, httpOptions);
    return this.http.post(`http://localhost:8080/api/v1/register`, body, httpOptions);
  }

  getStoneAvailable(id) {
    this.stone.id = id;
    const body = JSON.stringify(this.stone);
    // return this.http.post(`https://endgame.world/endgameapi/api/v1/games/findstone`, body, httpOptions);
    return this.http.post(`http://localhost:8080/api/v1/games/findstone`, body, httpOptions);
  }

  claimStone(id) {
    this.stone.id = id;
    console.log(this.stone);
    const body = JSON.stringify(this.stone);
    // return this.http.post(`https://endgame.world/endgameapi/api/v1/games/claimstone`, body, httpOptions);
    return this.http.post(`http://localhost:8080/api/v1/games/claimstone`, body, httpOptions);
  }

  login(user: Login) {
    const body = JSON.stringify(user);
    // return this.http.post(`https://endgame.world/endgameapi/api/v1/register`, body);
    return this.http.post(`http://localhost:8080/api/v1/login`, body, httpOptions);
  }

  updateScore() {
    // return this.http.post(`https://endgame.world/endgameapi/api/v1/points`, httpOptions);
    return this.http.get(`http://localhost:8080/api/v1/points`, httpOptions);
  }


}
