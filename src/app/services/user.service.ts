import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  username: string;
  email: string;


  constructor(private _http: Http) {

  }


  //get the details of a speccific user using email
  getUser(email) {
    return this._http.get('http://localhost:3000/api.qsolver.com/user/' + email).map(res => res.json());
  }

  getNotifications(email, token) {
    return this._http.get('http://localhost:3000/api.qsolver.com/userNotification/'.concat(email), {
      params: { token: token }
    }).map(res => res.json());

  }



  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }
  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

}
