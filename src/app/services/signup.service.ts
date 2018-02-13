import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {


  constructor(private _http: Http) { }

  signup(firstname, lastname, username , usertype, email,  password) {
    console.log('from sign up');
    return this._http.post('http://localhost:3000/api/signup', {
      'firstname': firstname , 
      'lastname' : lastname, 
      'username': username, 
      'usertype' : usertype , 
      'email' : email ,
      'password' : password}).map(res => res.json());
  }

}
