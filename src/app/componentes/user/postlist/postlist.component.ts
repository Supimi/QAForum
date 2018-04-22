import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { QuestionService } from '../../../services/question.service';
import { QuestionsupportService } from '../../../services/questionsupport.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {
  questions: [string];
  date: Date;
  constructor(private _questionService: QuestionService, private _questionsupportService: QuestionsupportService, private _router: Router) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user = JSON.parse(userObject);

    this.getQuetions(user.token);
  }

  ngOnInit() {
    this.date=new Date();
  }

  getQuetions(authtoken) {
    this._questionService.getQuestions(authtoken).subscribe(ques => {
      this.questions = ques;
    },
      error => {
        console.log(error);
        console.log('unable to load questions from the database');
      }
    );
  }

  userPosted(anonymous,user) {
    if (anonymous== true) {
      return 'Unknown user';
    }
    else {
      return user;
    }
  }

  caltimePeriod(d) {
    let n = Math.round(Math.abs(this.date.getTime()- new Date(d).getTime())/(3600*1000*24));
    if (n==0){
      return  Math.round(Math.abs(this.date.getTime()- new Date(d).getTime())/(3600*1000))+' hours'
    }
    else{
      return n+' days';
    }

  }




  directTo(route: string, q_id: string) {
    this._questionsupportService.setQid(q_id);
    this._router.navigateByUrl(`/${route}`);
  }

}
