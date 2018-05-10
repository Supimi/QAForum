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

  addQuestion(question_content, tags, type, user_posted,anonymous, token) {
    return this._http.post('/api.qsolver.com/question', {
      'question_content': question_content,
      'tags': tags,
      'type': type,
      'user_posted': user_posted,
      'anonymous':anonymous,
      'token': token
    }).map(res => res.json());
  }

  //retrieve the all questions 
  getQuestions(token) {
    let headers = new Headers();
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api.qsolver.com/question',
      options
    ).map(res => res.json());
  }

  //get question which are posted by the current user
  getUserQuestions(token, username) {
    return this._http.get('/api.qsolver.com/question/userquestions', {
      params: {
        token: token,
        user_posted: username  
      }
    }, ).map(res => res.json());
  }

  //for admin-use
  getQuestionSet(token,type,date){
    let headers = new Headers();
    headers.append('x-access-token', token);
    headers.append('type',type);
    headers.append('datep',date);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api.qsolver.com/question/questionset',
      options
    ).map(res => res.json());



  }


  getUsername(email, token) {
    return this._http.get('/api.qsolver.com/user/usernamebyemail'.concat(email), {
      params: {
        token: token
      }
    }).map(res => res.json());
  }


  qSearch(search_txt, token) {
    return this._http.post('/api.qsolver.com/question/qsearch', {
      'token': token,
      'text': search_txt
    }).map(res => res.json());
  }



}
