import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { QuestionService } from '../../../services/question.service';
import { QuestionsupportService } from '../../../services/questionsupport.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  questions: [string];
  date: Date;

  constructor(private _questionService: QuestionService, private _questionsupportService: QuestionsupportService, private _router: Router) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user = JSON.parse(userObject);
   
    this.getUserQuetions(user.token, user.username);
    console.log('questions', this.questions);

  }

  ngOnInit() {
    this.date = new Date();
  }

  getUserQuetions(authtoken, username) {
    this._questionService.getUserQuestions(authtoken, username).subscribe(ques => {
      this.questions = ques;
    },
      error => {
        console.log('unable to load questions from the database');
      }
    );
  }

  

  userPosted(anonymous, user) {
    if (anonymous == true) {
      return 'Unknown user';
    }
    else {
      return user;
    }
  }


  caltimePeriod(d) {
    let n = Math.round(Math.abs(this.date.getTime() - new Date(d).getTime()) / (3600 * 1000 * 24));
    if (n == 0) {
      return Math.round(Math.abs(this.date.getTime() - new Date(d).getTime()) / (3600 * 1000)) + ' hours'
    }
    else {
      return n + ' days';
    }

  }

  directTo(route: string, q_id: string) {
    var oldobj = JSON.parse(localStorage.getItem('userObject'));
    var newObject = { 'token': oldobj.token, 'email': oldobj.email, 'id': oldobj.id, 'usertype':oldobj.usertype,'username':oldobj.username, 'q_id': q_id }

    //if (typeof oldobj !== 'undefined') {
      localStorage.setItem('userObject', JSON.stringify(newObject));
      this._questionsupportService.setQid(q_id);
      this._router.navigateByUrl(`/${route}`);
   // };
  }

}
