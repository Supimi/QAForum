import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {


  constructor(private _http: Http) { }

  signup(firstname, lastname, username , usertype, email,  password) {
    return this._http.post('http://localhost:3000/api/signup', {
      'firstname': firstname , 'lastname' : lastname, 'usertype' : usertype , 'username': username, 'email' : email ,
      'password' : password}).map(res => res.json());
  }

}
