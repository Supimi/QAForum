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
    return this._http.get('http://localhost:3000/api.qsolver.com/question/' + id, {
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
    return this._http.get('http://localhost:3000/api.qsolver.com/answer/' + q_id, {
      params: {
        token: token, ref_question: q_id
      }
    }).map(res => res.json());

  }

  updateTotalRatings(token, referred_question, ans_id, ratings) {
    console.log(token, referred_question, ans_id, ratings);
    return this._http.put('http://localhost:3000/api.qsolver.com/answer/'.concat(referred_question).concat('/').concat(ans_id).concat('/ratings'), {
      token: token,
      ratings: ratings
    }).map(res => res.json());

  }

  getRating(token, ans_id, user_id) {
    return this._http.get('http://localhost:3000/api.qsolver.com/rating/'.concat(ans_id).concat("/").concat(user_id), {
      params: {
        token: token
      }
    }).map(res => res.json());
  }

  rateAnswer(token, ans_id, user_id, rating_level) {
    return this._http.post('http://localhost:3000/api.qsolver.com/rating', {
      token: token,
      ans_id: ans_id,
      user_id: user_id,
      rating_level: rating_level
    }).map(res => res.json());
  }

  updateRatingLevel(token, ans_id, userid, rating_level) {
    return this._http.put('http://localhost:3000/api.qsolver.com/rating/'.concat(ans_id), {
      token: token,
      ans_id: ans_id,
      userid: userid,
      rating_level: rating_level
    }).map(res => res.json());
  }

  getComments(token, q_id, ans_id) {
    return this._http.get("http://localhost:3000/api.qsolver.com/comment", {
      params: {
        token: token,
        ref_question: q_id,
        ref_answer: ans_id
      }
    }).map(res => res.json());
  }

  addComment(token,ref_question, ref_answer, comment, user_posted) {
    return this._http.post("http://localhost:3000/api.qsolver.com/comment", {
      token:token,
      ref_question: ref_question,
      ref_answer: ref_answer,
      comment: comment,
      user_posted: user_posted
    }).map(res => res.json());
  }



}
