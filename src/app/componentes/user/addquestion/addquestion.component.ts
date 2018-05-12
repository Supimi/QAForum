import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { QuestionService } from '../../../services/question.service';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})

export class AddquestionComponent implements OnInit {
  @Output() ques_added: EventEmitter<any> = new EventEmitter<any>();
  addquestionForm: FormGroup;
  question_content: String;
  tagtext: String;
  type: String;
  checkuser: boolean;
  username: String;
  titleAlert: String = '*This field is required.';
  message: String = '';
  user: any;
  tags: String[];
  modules: any;
  

  constructor(private _questionService: QuestionService, private _userService: UserService, private _formBuilder: FormBuilder, private _router: Router) {
    this.tagtext = '';
    this.type = '';
    this.username = '';
    this.addquestionForm = _formBuilder.group({
      'question_content': [null, Validators.required],
      'tags': [null, Validators.required],
      'type': [null, Validators.required],
      'checkuser': [false, Validators.required]
    });
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    this.user = JSON.parse(userObject);

    this.getModules(this.user.token);

  }

  ngOnInit() {
    
  }

  addQuestion(post) {
    this.question_content = post.question_content;
    this.tagtext = post.tags;
    this.tags = this.tagtext.split(" ");
    this.type = post.type;
    this.checkuser = post.checkuser;
    this.username = this._userService.getUsername();


    console.log('anonymous users', post.checkuser, this._userService.getUsername(), this._userService.getEmail());

    this._questionService.addQuestion(this.question_content, this.tags, this.type, this.username, this.checkuser, this.user.token).subscribe(res => {
      if (res.success) {
        console.log("Question posted");
        this.message = 'Your question is posted successfully.'
        this.close();
        this.onadd(res.success);
      }

    },
      error => {
        console.log(error);
        this.message = 'Post failed.';
        console.log("Post failed");
        console.log(this.user.token);

      }
    );
    this.addquestionForm.reset();

  }

  getModules(token) {
    this._userService.getSpecializations(token).subscribe(res => {
      this.modules = res;
      console.log(res);
    }, error => {
      console.log("Error in fetching specializations");
    });
  }

  close() {
    document.getElementById('addq1').style.display = 'none';
  }

  onadd(success: boolean): void {
    this.ques_added.emit({
      added: true
    });
  }







}
