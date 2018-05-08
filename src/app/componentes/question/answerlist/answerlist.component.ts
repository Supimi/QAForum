import { Component, OnInit, Output } from '@angular/core';
import { QuestionsupportService } from '../../../services/questionsupport.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-answerlist',
  templateUrl: './answerlist.component.html',
  styleUrls: ['./answerlist.component.css']
})
export class AnswerlistComponent implements OnInit {
  addanswerForm: FormGroup;
  authToken: string;
  q_id: string;
  user: string;
  answers: [string];
 // @Output:rateclicked:

  constructor(private _questionsupportService: QuestionsupportService, private _formBuilder: FormBuilder) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var userobj = JSON.parse(userObject);

    this.authToken = userobj.token;
    this.user = userobj.email;
    this.q_id = this._questionsupportService.getQid() || userobj.q_id;
    this.getAnswers();

    this.addanswerForm = _formBuilder.group({
      'newanswer': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  postAnswer(post) {
    this._questionsupportService.addAnswer(this.authToken, this.q_id, post.newanswer, this.user).subscribe(res => {
      if (res.success) {
        console.log('Answer posted');
      }
    }, error => {
      console.log('Error in posting answer');
    });
    this.addanswerForm.reset();
    this.getAnswers();

  }

  getAnswers() {
    this._questionsupportService.getAnswers(this.authToken, this.q_id).subscribe(ans => {
      this.answers = ans;
      console.log(ans);
    },
      error => {
        console.log('Error in fetching answers');
      }
    );
  }



}
