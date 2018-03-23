import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class QuestionsupportService {
  q_id: string;

  constructor(private _http: Http) { }

  setQid(q_id) {
    this.q_id = q_id;
  }

  getQid() {
    return this.q_id;
  }

  //get the details of a question based on its id
  getQuestion(token, id) {
    return this._http.get('http://localhost:3000/api.qsolver.com/question/'+id, {
      params: {
        token: token, id: id
      }
    }).map(res => res.json());

  }

  //add new answers to the forum
  addAnswer(token, ref_question, ans_content, user) {
    return this._http.post('http://localhost:3000/api.qsolver.com/answer', { 'token': token, 'ref_question': ref_question, 'ans_content': ans_content, 'user': user }).map(res => res.json());

  }

  //get the answers which belongs to epecial question
  getAnswers(token, q_id) {
    return this._http.get('http://localhost:3000/api.qsolver.com/answer/'+q_id, {
      params: {
        token: token, ref_question: q_id
      }
    }).map(res => res.json());

  }



}
