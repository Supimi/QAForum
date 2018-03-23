import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { QuestionsupportService } from '../../services/questionsupport.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  ratingClicked: number;
  rating_panel:string;
  constructor(private _questionsupportService: QuestionsupportService, private _formBuilder: FormBuilder) {}

  @Input() answer: [string];
  @Input() ansId:string;

  ngOnInit() {
    this.rating_panel=this.ansId + "_panel";
    console.log(this.rating_panel);
  }

  rate(){
    console.log('calling from rate');
    let x = document.getElementById(this.rating_panel);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

  }

  ratingComponetClick(clickObj: any): void {
    this.ratingClicked = clickObj.rating;
    console.log(clickObj.rating);
  }

}
