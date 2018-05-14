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
    return this._http.get('/api.qsolver.com/user/' + email).map(res => res.json());
  }

  getNotifications(email, token) {
    return this._http.get('/api.qsolver.com/userNotification/'.concat(email), {
      params: { token: token }
    }).map(res => res.json());

  }

  updateUser(id, email, token, firstname, lastname, specialization, position, working_place, non_spec,index) {
    console.log("from update user");
    return this._http.put('/api.qsolver.com/user/'.concat(email), {
      token: token,
      id: id,
      firstname: firstname,
      lastname: lastname,
      specialization: specialization,
      position: position,
      working_place: working_place,
      non_spec: non_spec,
      index:index
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

  getSpecializations(token) {
    console.log("from user services getSpectializations")
    return this._http.get('/api.qsolver.com/specialization', {
      params: { token: token }
    }
    ).map(res => res.json());
  }

}
