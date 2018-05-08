import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionsupportService } from '../../services/questionsupport.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer: any;

  ratingClicked: number;
  rating_panel: string;
  comment_panel: string;
  token: string;
  userid: string;
  comments: any;
  addcommentForm: FormGroup;
  email: string;
  fieldsLoaded: Promise<boolean>;
  ans_content:string;

  constructor(private _questionsupportService: QuestionsupportService, private _formBuilder: FormBuilder) {
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    var user_details = JSON.parse(userObject);

    //set token
    this.token = user_details.token;
    //set userid
    this.userid = user_details.id;
    //set email
    this.email = user_details.email;
    console.log(user_details.id);
    console.log('answer', this.answer);

    this.addcommentForm = _formBuilder.group({
      'newcomment': [null, Validators.required]
    });
  }


  ngOnInit() {
    this.rating_panel = this.answer._id + "_panel";
    this.comment_panel = this.answer._id + "_cmntpanel";
    this.ans_content=this.answer._id+"_ans";
    console.log(this.rating_panel, this.comment_panel);
    this.getComments();
  }

  rate() {
    document.getElementById(this.comment_panel).style.display="none";
    //get the current rating level
    this.getCurrentRatingLevel();

    let x = document.getElementById(this.rating_panel);

    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

  ratingComponetClick(clickObj: any): void {
    console.log(this.ratingClicked, 'rrrrrrrrrrrrrrr');
    if (this.ratingClicked == 0) {
      console.log(this.token, this.answer._id, this.userid, clickObj.rating);
      this.addRating(clickObj.rating);
    }
    else {
      this.updateRating(clickObj.rating);
    }
    if (clickObj.rating - this.ratingClicked != 0) {
      this.updateTotalRating(clickObj.rating - this.ratingClicked);
    }
    this.ratingClicked = clickObj.rating;
    console.log(this.ratingClicked, 'rrrrrrrrrrrrrrrr');
  }

  updateRating(rating_level) {
    this._questionsupportService.updateRatingLevel(this.token, this.answer._id, this.userid, rating_level).subscribe(res => {
      console.log(res, "successfully updated new rating level");
    }, error => {
      console.log("Error while updating rating", this.token, this.answer._id, this.userid, rating_level);
    });
  }

  getCurrentRatingLevel() {
    this._questionsupportService.getRating(this.token, this.answer._id, this.userid).subscribe(res => {
      console.log(res, "rating Level");
      this.ratingClicked = res.rating;
      console.log(this.ratingClicked, '..............................');
    }, error => {
      console.log("Error while fetching rating");
    });

  }

  updateTotalRating(ratings) {
    return this._questionsupportService.updateTotalRatings(this.token, this.answer.refered_question, this.answer._id, ratings).subscribe(res => {
      console.log(res);
    }, error => {
      console.log("Error while updating total rating", this.token, this.answer.refered_question, this.answer._id, ratings);
    });

  }

  addRating(rating_level) {
    console.log('answer', this.answer);
    this._questionsupportService.rateAnswer(this.token, this.answer._id, this.userid, rating_level).subscribe(res => {
      console.log(res);
    }, error => {
      console.log("Error while adding new rating");
    });
  }

  comment() {
    let x = document.getElementById(this.comment_panel);
    document.getElementById(this.rating_panel).style.display="none";
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  getComments() {
    this._questionsupportService.getComments(this.token, this.answer.refered_question, this.answer._id).subscribe(res => {
      console.log(res);
      this.comments = res;
      this.fieldsLoaded = Promise.resolve(true);
    },
      error => {
        console.log("Error while fetching the comments");
      });
  }

  postComment(post) {
    this._questionsupportService.addComment(this.token, this.answer.refered_question, this.answer._id, post.newcomment, this.email).subscribe(res => {
      console.log(res);
    },
      error => {
        console.log("Error in posting new comment");
      });
    this.getComments();
    this.addcommentForm.reset();
  }

  editAnswer(){
    document.getElementById(this.ans_content).contentEditable = "true";
    document.getElementById(this.ans_content).focus();
  }


}
