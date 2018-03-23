import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { timeout } from 'q';

@Injectable()
export class QuestionService {

  constructor(private _http: Http) { }

  addQuestion(question_content, tags, type, user_posted, token) {
    return this._http.post('http://localhost:3000/api.qsolver.com/question', {
      'question_content': question_content,
      'tags': tags,
      'type': type,
      'user_posted': user_posted,
      'token': token
    }).map(res => res.json());
  }

  //retrieve the all questions 
  getQuestions(token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('http://localhost:3000/api.qsolver.com/question', 
      options
    ).map(res => res.json());
  }

  //get question which are posted by the current user
  getUserQuestions(token, username) {
    return this._http.get('http://localhost:3000/api.qsolver.com/question/userquestions', {
      params: {
        token: token,
        username: username
      }
    }, ).map(res => res.json());
  }


  getUsername(email, token) {
    return this._http.get('http://localhost:3000/api.qsolver.com/user/usernamebyemail', {
      params: {
        token: token, id: email
      }
    }).map(res => res.json());
  }



}
