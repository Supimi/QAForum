import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Request } from '../../app/models/request';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AdminService {
  searching_criteria: string;
  collection: string;
  updated = new EventEmitter();


  constructor(private _http: Http) { }

  setSearchingCriteria(criteria) {
    this.searching_criteria = criteria;
    this.updated.emit(this.searching_criteria);
  }

  getSearchingCriteria() {
    return this.searching_criteria;
  }

  setCollection(collection) {
    this.collection = collection;
  }

  getCollection() {
    return this.collection;
  }

  addSpecilization(token, module) {
    return this._http.post('/api.qsolver.com/specialization', {
      token: token,
      module_code: module.Module_code,
      module_name: module.Module_name,
      semester: module.Semester,
      stream: module.Stream,
      tag:module.tag
    }).map(res => res.json());
  }

  getSpecializations(token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api.qsolver.com/specialization', options).map(res => res.json());
  }

  getUserCount(token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api.qsolver.com/user/count/usercount', options).map(res => res.json());
  }

  addUser(usertype, user, password) {
    console.log('adding new user to the system');
    return this._http.post('/api.qsolver.com/user/signup', {
      'firstname': user.getFirstName(),
      'lastname': user.getLastName(),
      'username': user.getUserName(),
      'usertype': usertype,
      'email': user.getEmail(),
      'password': password,
      'specilization': null,
      'index': null,
      'position': null,
      'working_place': null
    }).map(res => res.json());
  }

  sendMail(token, email, subject, message) {
    return this._http.post('/api.qsolver.com/adminNotification/sendgrid', {
      token: token,
      email: email,
      subject: subject,
      message: message
    }).map(res => res.json());
  }

  getUserRequests(token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api.qsolver.com/adminNotification', options).map(res => res.json());

  }

  updateNotificationStatus(token, id) {
    return this._http.put('/api.qsolver.com/adminNotification/status', {
      token: token,
      id: id
    }).map(res => res.json());
  }

  updateViewStatus(token, id) {
    return this._http.put('/api.qsolver.com/adminNotification/viewstatus', {
      token: token,
      id: id
    }).map(res => res.json());
  }

  getrandomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*|?,.ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    console.log("Pasword--->>",pass);
    return pass;
  }

  searchUser(token, searchtxt) {
    return this._http.get('/api.qsolver.com/user/search/adminsearch', {
      params: {
        token: token,
        searchtxt: searchtxt
      }
    }).map(res => res.json());
  }


}
