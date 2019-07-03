import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const body = JSON.stringify(user);
    return this.http.post(`https://www.endgame.world/endgameapi/api/v1/register`, body, httpOptions);
  }
}
