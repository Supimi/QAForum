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
  username:string;

  constructor(private _questionService: QuestionService, private _questionsupportService: QuestionsupportService, private _router: Router) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user = JSON.parse(userObject);
    this.getUsername(user.token, user.email);
    this.getUserQuetions(user.token,this.username);

  }

  ngOnInit() {
  }

  getUserQuetions(authtoken,username) {
    this._questionService.getUserQuestions(authtoken,username).subscribe(ques => {
      this.questions = ques;
    },
      error => {
        console.log('unable to load questions from the database');
      }
    );
  }

  getUsername(authtoken,email){
    this._questionService.getUsername(authtoken,email).subscribe(res=>{
      this.username=res.username;
    });
  }

  userPosted(u) {
    if (u == null) {
      return 'Unknown user';
    }
    else {
      return u;
    }

  }

}
