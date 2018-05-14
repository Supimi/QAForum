import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../../../models/question'
import { QuestionService } from '../../../services/question.service';
import {QuestionsupportService} from '../../../services/questionsupport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit {
  type: string = 'Academic Subject';
  duration: string = 'Today';
  questionsForm: FormGroup;
  questions: any;
  @Input() token: string;

  constructor(private _formBuilder: FormBuilder, private _questionService: QuestionService,private _questionsupportService:QuestionsupportService,private _router:Router) {


    this.questionsForm = this._formBuilder.group({
      'type': [null, Validators.required],
      'duration': [null, Validators.required]
    });

    this.questions=this.getQuestions();

  }

  ngOnInit() {
   
  }

  getQuestions() {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user_details = JSON.parse(userObject);
    this._questionService.getQuestionSet(user_details.token, this.type, '2018-05-13').subscribe(res=>{
      console.log(res);
      this.questions=res;
    });

  }

  displayUserPosted(anonymous,user_posted){
    console.log('user-->',Question.displayUserPosted(anonymous,user_posted));
    return Question.displayUserPosted(anonymous,user_posted);
  }

  directTo(route: string, q_id: string) {
    var oldobj = JSON.parse(localStorage.getItem('userObject'));
    var newObject = { 'token': oldobj.token, 'email': oldobj.email, 'id': oldobj.id, 'usertype':oldobj.usertype,'username':oldobj.username, 'q_id': q_id }

      localStorage.setItem('userObject', JSON.stringify(newObject));
      this._questionsupportService.setQid(q_id);
      this._router.navigateByUrl(`/${route}`);
  }

}
