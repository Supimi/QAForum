import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SigninService {
  authToken: string;
  login_success: boolean;
  _id: string;
  email: string;

  constructor(private _http: Http) { 
  }


  signin(email , password ) {
    console.log( console.log('from sign in'));
    const headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form=urlencoded' );
    return this._http.post('http://localhost:3000/api/login', { 'email': email ,'password' : password }).map(res=>res.json());
  }
   
  setAuthToken(token){
      this.authToken = token;
      this.login_success = true;
  }
  setId(id){
    this._id=id;
  }

  setEmail(email){
    this.email = email;
  }

  getUser(email){
    return this._http.post('http://localhost:3000/api/userdetails', {'email': email }).map(res=>res.json());
  }

  getauthToken(){
    return this.authToken;
  }

  getId(){
    return this._id;
  }

  getEmail(){
    return this.email;
  }
}
