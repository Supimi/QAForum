import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {


  constructor(private _http: Http) { }

  signup(firstname, lastname, username , usertype, email,  password, specilization, index, position, working_place) {
    console.log('from sign up');
    return this._http.post('http://localhost:3000/api/signup', {
      'firstname': firstname , 
      'lastname' : lastname, 
      'username': username, 
      'usertype' : usertype , 
      'email' : email ,
      'password' : password,
      'specilization': specilization,
      'index' : index,
      'position' : position,
      'working_place' : working_place
    }).map(res => res.json());
  }

  signupRequest(firstname, lastname, username , usertype, email, specilization, index, position,  working_place, status) {
    console.log('from sign up');
    return this._http.post('http://localhost:3000/api/addUserRequest', {
      'firstname': firstname , 
      'lastname' : lastname, 
      'username': username, 
      'usertype' : usertype , 
      'email' : email ,
      'specilization': specilization,
      'index' : index,
      'position' : position,
      'working_place' :  working_place,
      'status': status
    }).map(res => res.json());
  }

}
