import { Component, OnInit } from '@angular/core';
import { QuestionsupportService } from '../../services/questionsupport.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  authToken: string;
  q_id: string;
  q_content: string;
  tags: string;
  type:string;
  user_posted: string;
  date_posted: string;
  user:string;

  constructor(private _questionsupportService: QuestionsupportService) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user = JSON.parse(userObject);

    this.authToken = user.token;
    this.user = user.email;
    this.q_id = this._questionsupportService.getQid();
    this.getDetails(this.authToken,this.q_id);
  }

  ngOnInit() {}

  getDetails(token,id){
    this._questionsupportService.getQuestion(token, id).subscribe(res => {
      this.q_content = res.question_content;
      this.tags= res.tags;
      this.type=res.type;
      this.user_posted=res.user_posted;
      this.date_posted=res.date_posted;

      console.log( this.q_content, res.question_content);
    },
      error => {
        console.log('cannot fetch the question content');

      }
    );
  }

  
}
