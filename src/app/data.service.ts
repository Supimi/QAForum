import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;
  res: any;

  constructor(private _http: Http) { }

  getUsers() {
    console.log('from get user');
    return this._http.get('http://localhost:3000/api/users')
      .map(result => this.result = result);
  }
  loginUser(data) {
    this._http.post('http://localhost:3000/api/login', {
      username: data.email,
      password: data.password
    }).map(res => this.res = res.json);
    console.log(this.res);
  }

  signupUser(data) {
    this._http.post('http://localhost:3000/api/signup', {
      name: data.username,
      username: data.email,
      password: data.password
    });
  }

  signup(name, username , password) {
    return this._http.post('http://localhost:3000/api/signup', {
      'name': name , 'username': username, 'password' : password}).map(res => res.json());
  }

}
