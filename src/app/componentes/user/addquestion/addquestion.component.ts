import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { QuestionService } from '../../../services/question.service';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-4-dropdown-multiselect';


@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})

export class AddquestionComponent implements OnInit {
  @Output() ques_added: EventEmitter<any> = new EventEmitter<any>();
  addquestionForm: FormGroup;
  question_content: String;
  type: String;
  checkuser: boolean;
  username: String;
  titleAlert: String = '*This field is required.';
  message: String = '';
  user: any;
  modules: any;
  optionsModel: number[];
  selectedOptions: number[] = [];

  // Settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    selectionLimit: 3,
    autoUnselect: true,
  };

  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'tag selected',
    checkedPlural: 'tags selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',


  };

  // Labels / Parents
  myOptions: IMultiSelectOption[]=[];
  mytags: IMultiSelectOption[];





  constructor(private _questionService: QuestionService, private _userService: UserService, private _formBuilder: FormBuilder, private _router: Router) {
    this.type = '';
    this.username = '';
    this.optionsModel = [];

    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    this.user = JSON.parse(userObject);

    this.getModules(this.user.token);

  }

  ngOnInit() {

    this.addquestionForm = this._formBuilder.group({
      'question_content': [null, Validators.required],
      'type': [null, Validators.required],
      'optionsModel': [this.optionsModel, Validators.required],
      'checkuser': [false, Validators.required]
    });
    this.addtags() ;

  }

  constructList() {

    for (var i = 0; i < this.modules.length; i++) {
      this.myOptions.push({ id: this.modules[i].tag, name: this.modules[i].module_name, parentId: this.modules[i].module_code }, );
    }
    this.mytags = this.myOptions;

  }

  addtags() {
    this.addquestionForm.get('optionsModel').valueChanges
      .subscribe((selectedOptions) => {
        this.selectedOptions.push(selectedOptions);
      });

  }


  addQuestion(post) {
    console.log(this.optionsModel);
    this.question_content = post.question_content;
    this.type = post.type;
    this.checkuser = post.checkuser;
    this.username = this._userService.getUsername();


    console.log('anonymous users', post.checkuser, this._userService.getUsername(), this._userService.getEmail());

    this._questionService.addQuestion(this.question_content, this.selectedOptions, this.type, this.username, this.checkuser, this.user.token).subscribe(res => {
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
      console.log(this.modules);
      this.constructList();
      console.log(this.myOptions);
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
